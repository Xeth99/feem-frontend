import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import Loader from "./Notifications/Loader";
import UploadImageService from "../Redux/APIs/ImageUploadService.js";

function Uploader({ setImageUrl }) {
  const [loading, setLoading] = useState(false);

  // upload file
  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = new FormData();
      file.append("file", acceptedFiles[0]);
      const data = await UploadImageService(file, setLoading);
      setImageUrl(data);
    },
    [setImageUrl]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
    });
  return (
    <div className="w-full text-center flex-colo gap-6">
      {loading ? (
        <div className="px-6 w-full py-8 border-2 border-border border-dashed bg-dry rounded-md cursor-pointer">
          <Loader />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className="px-6 w-full py-8 border-2 border-border border-dashed bg-main rounded-md cursor-pointer"
        >
          <input {...getInputProps()} />
          <span className="mx-auto flex-colo text-subMain text-3xl">
            <FiUploadCloud />
          </span>
          <p className="text-sm mt-2">Drag your image here</p>
          <em className="text-xs text-border">
            {isDragActive
              ? "Drop the image here"
              : isDragReject
              ? "Unsupported file type..."
              : "only .jpg and .png files will be accepted"}
          </em>
        </div>
      )}
    </div>
  );
}

export default Uploader;
