/* eslint-env serviceworker */
/* eslint no-restricted-globals: 1, no-underscore-dangle: 0 */

import { SKIP_WAITING, CLIENTS_CLAIM } from '../constants';

export class UpdateManager {
  constructor() {
    self.addEventListener('message', this.handleMessage);
  }

  /*
   * Service worker sent from page messages handling
   */
  handleMessage = (event) => {
    switch (event?.data?.type) {
      case SKIP_WAITING:
        self.skipWaiting();
        break;
      case CLIENTS_CLAIM:
        clients.claim();
        break;
      default:
        break;
    }
  };
}
