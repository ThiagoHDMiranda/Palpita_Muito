import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Palpita Muito",
    short_name: "Palpita Muito",
    description: "Palpita Muito - Palpites da copa",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f6f4ec",
    theme_color: "#000000",
    icons: [
      {
        src: "/palpita_muito_logo_192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/palpita_muito_logo_512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
