import * as React from 'react';
import { Workbox } from 'workbox-window/Workbox';
import { messageSW } from 'workbox-window/messageSW';

import { ServiceWorkerContext } from './context';

import { onVisibilityChange } from '../helpers';
import { SKIP_WAITING, GET_VERSION } from '../constants';

declare global {
  interface Window {
    swm: any;
  }
}

export type SWMProps = {
  children: React.ReactNode;
  scope: string;
  useCustomInstall?: boolean;
};

export class ServiceWorkerManager extends React.Component<SWMProps, any> {
  static defaultProps = {
    scope: '/',
  };

  waitingServiceWorker: any;

  wb: any;

  removeVisibilityChangeListener: () => void;

  constructor(props) {
    super(props);

    if (process.env.DEBUG) {
      window.swm = this;
    }

    this.waitingServiceWorker = null;

    this.wb = new Proxy(
      {},
      {
        get() {
          console.warn(`Your Workbox instance wasn't created yet.`);
        },
      },
    );

    this.removeVisibilityChangeListener = () => {};

    this.state = {
      isUpdateAvaliable: false,
      isUpdating: false,
      appInstallPrompt: new Proxy(
        {},
        {
          get() {
            console.warn(`appInstalPrompt instance wasn't set.`);
          },
        },
      ),
    };
  }

  componentDidMount(): void {
    this.interceptInstallPrompt();
    this.initServiceWorker();
  }

  componentWillUnmount(): void {
    this.removeVisibilityChangeListener();
  }

  handleServiceWorkerWaiting = (event) => {
    if (process.env.DEBUG) {
      if (event.type === 'waiting') {
        console.groupCollapsed('Service worker is waiting for activation:');
      } else {
        console.groupCollapsed('Service worker treated as "external" and is waiting for activation:');
      }
      console.dir(event);
      console.groupEnd();
    }

    this.waitingServiceWorker = event.sw;
    this.setState({ isUpdateAvaliable: true });

    if (process.env.DEBUG) {
      Promise.all([
        this.wb.controlling.then(this.getServiceWorkerVersion), // We are getting current controlling SW to get it's version
        this.getServiceWorkerVersion(this.waitingServiceWorker), // This SW is installed and waiting for activation
      ]).then(([currentVersion, nextVersion]) =>
        console.log(`Update found! Your app v${currentVersion} will be replaced with v${nextVersion}`),
      );
    }
  };

  handleUpdateAccept = () => {
    const {
      state: { isUpdating },
      waitingServiceWorker,
    } = this;

    if (isUpdating) return;

    this.setState({ isUpdating: true });

    messageSW(waitingServiceWorker, { type: SKIP_WAITING });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  };

  getServiceWorkerVersion = async (serviceWorker = null): Promise<string> => {
    if (serviceWorker instanceof ServiceWorker) {
      return messageSW(serviceWorker, { type: GET_VERSION });
    }

    const version = await this.wb.messageSW({ type: GET_VERSION });

    this.setState({
      version,
    });

    if (process.env.DEBUG) {
      console.log(`You are running app of version ${version}`);
    }

    return version;
  };

  manualUpdate = (): void => {
    this.wb.update();
  };

  interceptInstallPrompt(): void {
    const { useCustomInstall } = this.props;
    if (useCustomInstall) {
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault(); // Prevent the mini-infobar from appearing on mobile
        this.setState({ appInstallPrompt: event });
      });
    }
  }

  async initServiceWorker(): Promise<any> {
    if ((process.env.NODE_ENV === 'production' || process.env.DEBUG) && 'serviceWorker' in navigator) {
      const { scope } = this.props;

      this.wb = new Workbox('/service-worker.js', { scope });

      const { wb } = this;

      wb.addEventListener('waiting', this.handleServiceWorkerWaiting);
      wb.addEventListener('externalwaiting', this.handleServiceWorkerWaiting);

      await wb.register();

      this.removeVisibilityChangeListener = onVisibilityChange(() => {
        if (process.env.DEBUG) {
          console.log('Checking for Service Worker update...');
        }
        wb.update();
      });

      this.getServiceWorkerVersion();
    }
  }

  render(): JSX.Element {
    const { children } = this.props;
    const {
      handleUpdateAccept,
      manualUpdate,
      state: { isUpdateAvaliable, appInstallPrompt, isUpdating, version },
    } = this;

    const contextValue = {
      isUpdateAvaliable,
      isUpdating,
      appInstallPrompt,
      handleUpdateAccept,
      manualUpdate,
      version,
    };

    return React.createElement(ServiceWorkerContext.Provider, { value: contextValue }, children);
  }
}
