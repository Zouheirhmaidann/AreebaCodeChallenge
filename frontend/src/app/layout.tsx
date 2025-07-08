import "./globals.css";
import ToastProvider from "./ToastProvider";

export const metadata = {
  title: "Areeba Code Challenge",
  description: "A code challenge by Areeba",
  icons: {
    icon: "/areeba-icon.png", // path relative to /public
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
