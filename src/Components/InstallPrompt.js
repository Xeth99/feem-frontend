import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    const isIOS = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase()
    );
    const isInStandaloneMode =
      "standalone" in window.navigator && window.navigator.standalone;
    if (isIOS && !isInStandaloneMode) {
      setShowInstall(true);
    }
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    showInstall && (
      <div className="fixed top-6 left-4 right-4 md:right-4 md:left-auto md:w-auto w-[90%] bg-white shadow-lg p-4 rounded-xl border z-[999]">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {deferredPrompt ? (
              <>
                <p className="mb-2">Want to install Feem on your device?</p>
                <button
                  onClick={handleInstallClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Install
                </button>
              </>
            ) : (
              <p className="text-sm">
                To install Feem, tap the <strong>Share</strong> icon in Safari
                and select <strong>"Add to Home Screen"</strong>.
              </p>
            )}
          </div>
          <button
            onClick={() => setShowInstall(false)}
            className="ml-4 text-gray-500 hover:text-gray-800 text-lg font-bold"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      </div>
    )
  );
};

export default InstallPrompt;
