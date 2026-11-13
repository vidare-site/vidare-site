const images = {
  '/assets/07.webp': { name: '07', widths: [320, 640], width: 640, height: 960, sizes: '(max-width: 767px) 80vw, 350px' },
  '/assets/30.webp': { name: '30', widths: [640, 1200], width: 1200, height: 1200 },
  '/assets/33.webp': { name: '33', widths: [640, 1200], width: 1200, height: 1308 },
  '/assets/35.webp': { name: '35', widths: [640, 1200], width: 1200, height: 655, sizes: '(max-width: 767px) 100vw, 50vw' },
  '/assets/13.webp': { name: '13', widths: [96], width: 96, height: 171, sizes: '48px' },
  '/assets/logo-dark1.webp': { name: 'logo-intake', widths: [280, 560], width: 560, height: 164, sizes: '80px' },
};

export default function OptimizedImage({ src, alt, ...props }) {
  const image = images[src];
  if (!image) return <img src={src} alt={alt} decoding="async" {...props} />;
  return <img src={`/assets/optimized/${image.name}-${image.widths.at(-1)}.webp`}
    srcSet={image.widths.map((width) => `/assets/optimized/${image.name}-${width}.webp ${width}w`).join(', ')}
    sizes={image.sizes || '(max-width: 767px) 100vw, 1003px'}
    width={image.width} height={image.height} alt={alt} decoding="async" {...props} />;
}
