import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Trường Kỹ thuật và Công nghệ - Đại học Vinh",
    short_name: "SET VinhUni",
    description: "Cổng thông tin chính thức Trường Kỹ thuật và Công nghệ - Đại học Vinh",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#b7410e",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
