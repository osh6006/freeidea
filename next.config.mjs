import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const { NEXT_PUBLIC_S3_URL } = process.env;

const isAnalyze = process.env.ANALYZE === 'true';

const nextConfig = {
  reactStrictMode: false,
  outputFileTracing: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fastly.picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: NEXT_PUBLIC_S3_URL,
        pathname: '/**',
      },
    ],
    // 정상 배포시 활성화
    // minimumCacheTTL: 604800,
    formats: ['image/avif', 'image/webp'],
  },
};

export default withBundleAnalyzer({ enabled: isAnalyze })(nextConfig);
