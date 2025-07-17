/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.cuoco.com.ar',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cuoco.com.ar',
        port: '',
        pathname: '/images/**',
      },
    ],
    dangerouslyAllowSVG: true
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
