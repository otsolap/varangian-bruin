const hostnames = [
  'localhost',
  '127.0.0.1',
  'varangianbruin.com',
  'api.varangianbruin.com'
]

/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
    remotePatterns: hostnames.map(hostname => ({
      hostname  
    }))
  }
}

module.exports = nextConfig;
