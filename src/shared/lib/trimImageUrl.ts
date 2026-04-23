const WHITE_THRESHOLD = 240;

const isWhitePixel = (r: number, g: number, b: number, a: number) =>
  a === 0 || (r >= WHITE_THRESHOLD && g >= WHITE_THRESHOLD && b >= WHITE_THRESHOLD);

const trimLoadedImage = (image: HTMLImageElement): string | null => {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  ctx.drawImage(image, 0, 0);

  const { width, height } = canvas;
  const { data } = ctx.getImageData(0, 0, width, height);

  let top = 0;
  let bottom = height - 1;
  let left = 0;
  let right = width - 1;

  const pixelAt = (x: number, y: number) => {
    const i = (y * width + x) * 4;
    return isWhitePixel(data[i], data[i + 1], data[i + 2], data[i + 3]);
  };

  topLoop: for (; top < height; top++) {
    for (let x = 0; x < width; x++) if (!pixelAt(x, top)) break topLoop;
  }
  bottomLoop: for (; bottom > top; bottom--) {
    for (let x = 0; x < width; x++) if (!pixelAt(x, bottom)) break bottomLoop;
  }
  leftLoop: for (; left < width; left++) {
    for (let y = top; y <= bottom; y++) if (!pixelAt(left, y)) break leftLoop;
  }
  rightLoop: for (; right > left; right--) {
    for (let y = top; y <= bottom; y++) if (!pixelAt(right, y)) break rightLoop;
  }

  const trimmedWidth = right - left + 1;
  const trimmedHeight = bottom - top + 1;
  if (trimmedWidth <= 0 || trimmedHeight <= 0) return null;

  const out = document.createElement('canvas');
  out.width = trimmedWidth;
  out.height = trimmedHeight;
  out.getContext('2d')?.drawImage(
    canvas,
    left,
    top,
    trimmedWidth,
    trimmedHeight,
    0,
    0,
    trimmedWidth,
    trimmedHeight
  );

  return out.toDataURL('image/png');
};

const trimImagePromise = (src: string): Promise<string> =>
  new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      try {
        const result = trimLoadedImage(image);
        resolve(result ?? src);
      } catch {
        resolve(src);
      }
    };
    image.onerror = () => resolve(src);
    image.src = src;
  });

type CacheEntry =
  | { status: 'pending'; promise: Promise<void> }
  | { status: 'done'; value: string }
  | { status: 'error'; value: string };

const cache = new Map<string, CacheEntry>();

export const readTrimmedImage = (src: string): string => {
  let entry = cache.get(src);

  if (!entry) {
    const promise = trimImagePromise(src).then(
      (value) => { cache.set(src, { status: 'done', value }); },
      () => { cache.set(src, { status: 'error', value: src }); }
    );
    entry = { status: 'pending', promise };
    cache.set(src, entry);
  }

  if (entry.status === 'pending') throw entry.promise;
  return entry.value;
};
