import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RideShare",
  description: "Gjej një udhëtim të përbashkët për në AAB",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sq">
      <body>
        <div className="telefoni">{children}</div>
      </body>
    </html>
  );
}
