import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ControlPanel from "./components/ControlPanel";
import Header from "./components/Header";
import ImageGrid from "./components/ImageGrid";
import UploadZone from "./components/UploadZone";
import { processImage } from "./utils/imageProcessor";

function App() {
  const [images, setImages] = useState([]);
  const [blurAmount, setBlurAmount] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = useCallback((files) => {
    const newImages = files.map((file) => ({
      id: uuidv4(),
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const handleRemove = useCallback((id) => {
    setImages((prev) => {
      const newImages = prev.filter((img) => img.id !== id);
      // Cleanup object URL to avoid memory leaks
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return newImages;
    });
  }, []);

  const handleDownloadSingle = async (image) => {
    try {
      const blob = await processImage(image.preview, blurAmount);
      saveAs(blob, `${image.file.name}`);
    } catch (error) {
      console.error("Failed to process image:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const handleDownloadAll = async () => {
    if (images.length === 0) return;

    setIsProcessing(true);
    try {
      const zip = new JSZip();
      const promises = images.map(async (image) => {
        const blob = await processImage(image.preview, blurAmount);
        zip.file(`${image.file.name}`, blob);
      });

      await Promise.all(promises);

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "blurred-images.zip");
    } catch (error) {
      console.error("Failed to process images:", error);
      alert("Failed to process images. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-indigo-500/30">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Upload & Grid */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-slate-800/30 rounded-2xl p-1">
              <UploadZone onUpload={handleUpload} />
            </div>

            <div className="min-h-[200px]">
              {images.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4 px-2">
                    <h2 className="text-xl font-semibold text-slate-200">
                      Uploaded Images{" "}
                      <span className="text-slate-500 text-sm ml-2">
                        ({images.length})
                      </span>
                    </h2>
                    <button
                      onClick={() => setImages([])}
                      className="text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <ImageGrid
                    images={images}
                    blurAmount={blurAmount}
                    onRemove={handleRemove}
                    onDownloadSingle={handleDownloadSingle}
                  />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl">
                  <p>No images uploaded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Controls */}
          <div className="lg:col-span-4">
            <ControlPanel
              blurAmount={blurAmount}
              setBlurAmount={setBlurAmount}
              onDownloadAll={handleDownloadAll}
              hasImages={images.length > 0}
              isProcessing={isProcessing}
            />

            <div className="mt-6 p-4 bg-indigo-500/5 rounded-xl border border-indigo-500/10">
              <h3 className="text-sm font-semibold text-indigo-400 mb-2">
                Pro Tip
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adjust the blur intensity using the slider. The preview updates
                instantly using CSS, but the final download uses high-quality
                canvas processing for the best results.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
