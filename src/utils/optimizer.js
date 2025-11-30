import imageCompression from "browser-image-compression";

export const compressImage = async (imageFileOrBlob) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: imageFileOrBlob.type === "image/png" ? "image/png" : "image/jpeg",
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(imageFileOrBlob, options);
    return compressedFile;
  } catch (error) {
    console.error("Error compressing image:", error);
    throw error;
  }
};
