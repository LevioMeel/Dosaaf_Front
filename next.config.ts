import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async headers() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       headers: [
  //         {
  //           key: "Access-Control-Allow-Credentials",
  //           value: "true",
  //         },
  //         {
  //           key: "Access-Control-Allow-Origin",
  //           value: "https://drdgen.ru", // Только фронтенд домен
  //         },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
  //         },
  //         // Важно для cookies с sameSite=None
  //         {
  //           key: "Access-Control-Expose-Headers",
  //           value: "Set-Cookie",
  //         },
  //       ],
  //     },
  //   ];
  // },
};
module.exports = {
  output: "standalone",
};
export default nextConfig;
