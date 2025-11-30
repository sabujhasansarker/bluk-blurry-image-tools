export const processImage = (imageUrl, blurAmount) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply blur
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Canvas to Blob failed"));
        }
      }, "image/png");
    };

    img.onerror = (err) => reject(err);
  });
};
