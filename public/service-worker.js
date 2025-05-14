// Import Workbox from CDN
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js"
);
if (workbox) {
  console.log("Yay! Workbox is loaded 🎉");
  
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  // Destructure needed Workbox modules
  const { registerRoute, setDefaultHandler, setCatchHandler } = workbox.routing;
  const { NetworkFirst, StaleWhileRevalidate, CacheFirst } = workbox.strategies;
  const { CacheableResponsePlugin } = workbox.cacheableResponse;
  const { ExpirationPlugin } = workbox.expiration;
  const { precacheAndRoute } = workbox.precaching;

  // Define files to precache
  precacheAndRoute([
    { url: "/", revision: null },
    { url: "/index.html", revision: null },
    { url: "/favicon.png", revision: null },
    { url: "/manifest.json", revision: null },
    { url: "/offline.html", revision: null },
    { url: "/fallback-image.png", revision: null },
  ]);

  // Cache API calls
  registerRoute(
    ({ url }) => url.pathname.startsWith("/movies/tmdb/"),
    new NetworkFirst({
      cacheName: "movie-api-cache",
      plugins: [
        new CacheableResponsePlugin({ statuses: [0, 200] }),
        new ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 10 * 60, // 10 minutes
        }),
      ],
    })
  );

  // Cache images with a Cache First strategy
  registerRoute(
    ({ request }) => request.destination === "image",
    new CacheFirst({
      cacheName: "image-cache",
      plugins: [
        new ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
        }),
      ],
    })
  );

  // Set default handler for all other requests
  setDefaultHandler(
    new StaleWhileRevalidate({
      cacheName: "default-cache",
      plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })],
    })
  );

  // Catch handler for offline fallbacks
  setCatchHandler(async ({ event }) => {
    if (event.request.destination === "document") {
      return caches.match("/offline.html");
    }
    if (event.request.destination === "image") {
      return caches.match("/fallback-image.png");
    }
    return Response.error(); // generic fallback
  });

  workbox.precaching.cleanupOutdatedCaches();
} else {
  console.error("Workbox could not be loaded. Check CDN or connection.");
}
