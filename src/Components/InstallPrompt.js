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
    return () => window.removeEventListener;
    "beforeinstallprompt", handler;
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
      <div className="fixed bottom-4 right-4 bg-white shadow-lg p-4 rounded-xl border">
        <p className="mb-2">Want to install this app on your device?</p>
        <button
          onClick={handleInstallClick}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Install
        </button>
      </div>
    )
  );
};

export default InstallPrompt;