/**
 * Client-Side Image Optimization Engine
 * Converts and resizes user avatars into optimized WebP data URLs using Canvas API.
 */

const ImageProcessor = {
  /**
   * Resizes an image file to specified dimensions and outputs WebP format
   */
  async processImage(file, maxWidth = 400, maxHeight = 400, quality = 0.85) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.onload = (e) => {
        const img = new Image();
        img.onerror = () => reject(new Error('Failed to decode image'));
        img.onload = () => {
          let { width, height } = img;

          // Maintain aspect ratio with cover fit
          const minDim = Math.min(width, height);
          const startX = (width - minDim) / 2;
          const startY = (height - minDim) / 2;

          const canvas = document.createElement('canvas');
          canvas.width = maxWidth;
          canvas.height = maxHeight;

          const ctx = canvas.getContext('2d');
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';

          // Crop to square and resize
          ctx.drawImage(img, startX, startY, minDim, minDim, 0, 0, maxWidth, maxHeight);

          // Export as WebP
          const dataUrl = canvas.toDataURL('image/webp', quality);
          resolve(dataUrl);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  /**
   * Batch process multiple images concurrently
   */
  async processBatch(fileList, maxWidth = 400, maxHeight = 400) {
    const promises = Array.from(fileList).map(file => 
      this.processImage(file, maxWidth, maxHeight)
        .then(dataUrl => ({ name: file.name, success: true, dataUrl }))
        .catch(err => ({ name: file.name, success: false, error: err.message }))
    );
    return Promise.all(promises);
  }
};
