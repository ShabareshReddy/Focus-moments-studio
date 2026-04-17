/**
 * generateLQIP — Low Quality Image Placeholder generator
 *
 * Draws any image URL onto a tiny 10×10 canvas and returns a base64 data-URL.
 * The result is a ~200-byte blurred preview that the browser can decode instantly,
 * eliminating the "grey box" flash before the real image loads.
 *
 * Results are cached in a module-level Map so each URL is processed at most once.
 */

const cache = new Map();

/**
 * @param {string} url  — any image URL (Supabase public, Unsplash, etc.)
 * @returns {Promise<string>} — a data:image/webp;base64,... string
 */
export async function generateLQIP(url) {
  if (cache.has(url)) return cache.get(url);

  return new Promise((resolve) => {
    // Fallback: if anything goes wrong, return a neutral warm-grey placeholder
    const fallback =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVQYV2N89+7dfwY0wMgwqpCuCgEAr0kH8W4bqVMAAAAASUVORK5CYII=";

    const img = new window.Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = 10;
        canvas.height = 10;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, 10, 10);

        // Prefer WebP (smaller), fall back to PNG
        let dataUrl;
        try {
          dataUrl = canvas.toDataURL("image/webp", 0.2);
        } catch {
          dataUrl = canvas.toDataURL("image/png");
        }

        cache.set(url, dataUrl);
        resolve(dataUrl);
      } catch {
        cache.set(url, fallback);
        resolve(fallback);
      }
    };

    img.onerror = () => {
      cache.set(url, fallback);
      resolve(fallback);
    };

    // Start loading — the browser will use CORS headers from Supabase
    img.src = url;
  });
}
