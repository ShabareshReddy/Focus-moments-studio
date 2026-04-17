/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Fine-grained breakpoints so the optimizer generates exactly the sizes we need
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Default format priority: serve WebP where supported, fall back to original
    formats: ['image/webp'],
    // Allow images from these remote hosts through the optimizer
    remotePatterns: [
      {
        protocol: 'https',
  hostname: 'zwxtfbdousgomhqovylg.supabase.co',
  pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
