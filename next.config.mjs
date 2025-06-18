/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    domains: ['localhost'],
  },
  
  // Proxy habilitado para evitar CORS en desarrollo/local
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dev.cuoco.com.ar/api/:path*',
      },
    ];
  },
};

export default nextConfig;
