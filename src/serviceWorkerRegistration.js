const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    const publicUrl = process.env.PUBLIC_URL
      ? new URL(process.env.PUBLIC_URL, window.location.href)
      : new URL(window.location.href);

    if (publicUrl.origin !== window.location.origin) return;

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL || ""}/service-worker.js`;
      console.log("swUrl", swUrl);
      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);
        navigator.serviceWorker.ready.then(() => {
          console.info("[SW] Localhost: Cache-first service worker ready.");
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      if (!registration.installing) return;

      registration.installing.onstatechange = () => {
        if (registration.installing.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.info("[SW] Update available.");
            config?.onUpdate?.(registration);
          } else {
            console.info("[SW] Content cached for offline use.");
            config?.onSuccess?.(registration);
          }
        }
      };
    })
    .catch((error) => {
      console.error("[SW] Registration failed:", error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { "Service-Worker": "script" } })
    .then((response) => {
      const contentType = response.headers.get("content-type");

      if (
        response.status === 404 ||
        (contentType && !contentType.includes("javascript"))
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => window.location.reload());
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.warn("[SW] Offline mode: No connection.");
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error("[SW] Unregister failed:", error.message);
      });
  }
}
