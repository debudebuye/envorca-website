import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://debudebuye.github.io/envorca-website/"),
  title: "Envorca — Linux development on Windows just works.",
  description:
    "Envorca is a Windows-first developer infrastructure daemon for WSL2 and Docker. It diagnoses, explains, and repairs your Linux development environment — no admin rights required.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Envorca — Linux development on Windows just works.",
    description:
      "A lightweight local daemon that manages WSL2 and Docker behind Windows dev workflows.",
    images: ["/banner.svg"],
  },
};

const themeScript = `
(function () {
  try {
    var t = localStorage.getItem("eno-theme");
    if (t !== "light" && t !== "dark") {
      t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.dataset.theme = t;
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}