import * as React from 'react';

export type ServiceWorkerContext = {
  isUpdateAvaliable: boolean;
  isUpdating: boolean;
  appInstallPrompt: Event;
  handleUpdateAccept: () => void;
  manualUpdate: () => void;
  version: string;
};

export const ServiceWorkerContext = React.createContext<ServiceWorkerContext>({
  isUpdateAvaliable: false,
  isUpdating: false,
  appInstallPrompt: new Event('null'),
  handleUpdateAccept: () => {},
  manualUpdate: () => {},
  version: '0.0.0',
});

export const useServiceWorkerContext = (): ServiceWorkerContext => React.useContext(ServiceWorkerContext);
