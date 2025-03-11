import { Toaster } from "react-hot-toast";

export default function ToastContainer() {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}
