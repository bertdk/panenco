/* eslint-env serviceworker */
/* eslint no-restricted-globals: 1, no-underscore-dangle: 0 */

import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, NavigationRoute, setCatchHandler } from 'workbox-routing';
import { NetworkOnly, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const defaultExpirationTime = {
  api: 24 * 60 * 60, // 24 hours
  bgSync: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
  googleFonts: 60 * 60 * 24 * 365, // 1 Year
  images: 30 * 24 * 60 * 60, // 30 Days
};

export function initServiceWorker({ CACHE_PREFIX, baseURL, expiration = defaultExpirationTime }) {
  /*
   * RegExp object used to register cache strategies over it's route path
   */

  const apiRegExp = new RegExp(`^${baseURL}`);

  /*
   * API GET responses caching
   */

  registerRoute(
    apiRegExp,
    new StaleWhileRevalidate({
      cacheName: `${CACHE_PREFIX}-api`,
      plugins: [
        new ExpirationPlugin({
          maxAgeSeconds: expiration.api,
        }),
      ],
    }),
  );

  setCatchHandler(new NetworkOnly());

  /*
   * Backgroud sync plugin rules.
   * Is used for making queued requests on network loss later.
   */

  const bgSyncPlugin = new BackgroundSyncPlugin(`${CACHE_PREFIX}-deffered-api-queue`, {
    maxRetentionTime: expiration.bgSync,
  });

  registerRoute(
    apiRegExp,
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'POST',
  );

  registerRoute(
    apiRegExp,
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'PUT',
  );

  registerRoute(
    apiRegExp,
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'PATCH',
  );

  registerRoute(
    apiRegExp,
    new NetworkOnly({
      plugins: [bgSyncPlugin],
    }),
    'DELETE',
  );

  /*
   * Static assets cache rules
   */

  precacheAndRoute(self.__WB_MANIFEST);

  registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new StaleWhileRevalidate({
      cacheName: `${CACHE_PREFIX}-google-fonts-stylesheets`,
    }),
  );

  registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new CacheFirst({
      cacheName: `${CACHE_PREFIX}-google-fonts-webfonts`,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new ExpirationPlugin({
          maxAgeSeconds: expiration.googleFonts,
          maxEntries: 30,
        }),
      ],
    }),
  );

  registerRoute(
    /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
    new CacheFirst({
      cacheName: `${CACHE_PREFIX}-images`,
      plugins: [
        new CacheableResponsePlugin({
          statuses: [0, 200], // saving opaque responses as well
        }),
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: expiration.images,
        }),
      ],
    }),
  );

  /*
   * Serving of main entry point "/index.html" file for all requests.
   * This is made to be able to handle routing via js router and to be able opening app from any "route point".
   */

  const handler = createHandlerBoundToURL('/index.html');
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);

  /*
   * Service worker sent from page messages handling
   */

  if (process.env.DEBUG) {
    const handleMessage = (event) => {
      console.groupCollapsed('Service worker reveived an event message:');
      console.dir(event);
      console.groupEnd();
    };

    self.addEventListener('message', handleMessage);
  }
}
