import { Sliders } from "lucide-react";

export default function ControlPanel({
  blurAmount,
  setBlurAmount,
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

        <div className="pt-4 border-t border-slate-700 space-y-3">
          <button
            onClick={onDownloadAll}
            disabled={!hasImages || isProcessing}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <span>Processing...</span>
            ) : (
              <span>Download All (ZIP)</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
