/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true
  },
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:'*',
      }
    ]
  },
  output:'export',
  reactStrictMode:false,
}

module.exports = nextConfig
