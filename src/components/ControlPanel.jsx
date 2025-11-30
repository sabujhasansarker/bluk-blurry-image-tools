import { Sliders } from "lucide-react";

export default function ControlPanel({
  blurAmount,
  setBlurAmount,
  format,
  setFormat,
  quality,
  setQuality,
  smartCompress,
  setSmartCompress,
  onDownload,
  onDownloadAll,
  hasImages,
  isProcessing,
}) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 sticky top-24">
      <div className="flex items-center space-x-2 mb-6">
        <Sliders className="w-5 h-5 text-indigo-400" />
        <h2 className="text-lg font-semibold text-white">Controls</h2>
      </div>

      <div className="space-y-6">
        {/* Blur Control */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300">
              Blur Intensity
            </label>
            <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-indigo-400">
              {blurAmount}px
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={blurAmount}
            onChange={(e) => setBlurAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
          />
        </div>

        {/* Format Control */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Output Format
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5"
          >
            <option value="original">Original</option>
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WEBP</option>
            <option value="image/avif">AVIF</option>
          </select>
        </div>

        {/* Smart Compress Toggle */}
        <div className="flex items-center justify-between">
          <label
            className={`text-sm font-medium ${
              format === "image/avif" ? "text-slate-500" : "text-slate-300"
            }`}
          >
            Smart Compression
            <span className="block text-xs text-slate-500 font-normal mt-0.5">
              {format === "image/avif"
                ? "Not supported for AVIF"
                : "TinyPNG-style optimization"}
            </span>
          </label>
          <button
            onClick={() => setSmartCompress(!smartCompress)}
            disabled={format === "image/avif"}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
              smartCompress && format !== "image/avif"
                ? "bg-indigo-600"
                : "bg-slate-700"
            } ${
              format === "image/avif" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <span
              className={`${
                smartCompress && format !== "image/avif"
                  ? "translate-x-6"
                  : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        {/* Quality Control (Hidden if Smart Compress is on, unless AVIF) */}
        {(!smartCompress || format === "image/avif") &&
          (format === "image/jpeg" ||
            format === "image/png" ||
            format === "image/webp" ||
            format === "image/avif") && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Quality
                </label>
                <span className="text-xs font-mono bg-slate-900 px-2 py-1 rounded text-indigo-400">
                  {Math.round(quality * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-indigo-400 transition-all"
              />
            </div>
          )}

        <div className="pt-4 border-t border-slate-700 space-y-3">
          <button
            onClick={onDownloadAll}
            disabled={!hasImages || isProcessing}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <span>Processing...</span>
            ) : (
              <span>Process & Download All</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
