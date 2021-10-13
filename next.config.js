/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["media.graphcms.com"],
  },
  async redirects() {
    return [
      {
        source: "/graduation",
        destination: process.env.NEXT_PUBLIC_GRADUATION_LINK,
        permanent: false,
      },
    ];
  },
};
