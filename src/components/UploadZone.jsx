import { clsx } from "clsx";
import { Image as ImageIcon, Upload } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadZone({ onUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        onUpload(acceptedFiles);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={clsx(
        "relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out",
        isDragActive
          ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
          : "border-slate-700 hover:border-indigo-400/50 hover:bg-slate-800/50 bg-slate-800/20"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div
          className={clsx(
            "mb-4 p-4 rounded-full transition-all duration-300",
            isDragActive
              ? "bg-indigo-500 text-white"
              : "bg-slate-800 text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400"
          )}
        >
          {isDragActive ? (
            <Upload className="w-8 h-8" />
          ) : (
            <ImageIcon className="w-8 h-8" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-slate-200 mb-1">
          {isDragActive ? "Drop images here" : "Drag & drop images"}
        </h3>
        <p className="text-sm text-slate-500 max-w-xs mx-auto">
          or click to select files from your computer
        </p>
      </div>
    </div>
  );
}
