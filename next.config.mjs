// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
//   images: {
//     remotePatterns: [
//       {
//         hostname: "i.ibb.co",
//         protocol: "https",
//       },
//        {
//         hostname: "images.unsplash.com",
//         protocol: "https",
//       },
//     ],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "img.freepik.com" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;