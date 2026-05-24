import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'EVPulse | Умная навигация для Электромобилей',
  description: 'Интеллектуальное планирование маршрутов для владельцев электромобилей в Беларуси.',
  appleWebApp: {
    title: 'EVPulse',
    statusBarStyle: 'black-translucent',
    capable: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#12121A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen" suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
