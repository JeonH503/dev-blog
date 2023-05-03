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
        hostname:'www.notion.so',
        port:'',
        pathname:'/images/**'
      }
    ]
  },
  reactStrictMode:false,
}

module.exports = nextConfig
