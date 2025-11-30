import { Download, X } from "lucide-react";

export default function ImageGrid({
  images,
  blurAmount,
  onRemove,
  onDownloadSingle,
}) {
  if (images.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative aspect-square bg-slate-800 rounded-xl overflow-hidden border border-slate-700"
        >
          <img
            src={image.preview}
            alt={image.file.name}
            className="w-full h-full object-cover transition-all duration-200"
            style={{ filter: `blur(${blurAmount}px)` }}
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => onDownloadSingle(image)}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors"
              title="Download processed image"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={() => onRemove(image.id)}
              className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-full text-red-400 backdrop-blur-sm transition-colors"
              title="Remove image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-xs text-slate-300 truncate px-1">
              {image.file.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
