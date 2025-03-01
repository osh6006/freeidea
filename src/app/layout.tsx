import type { Metadata, Viewport } from 'next';
import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

import GlobalProvider from '@/components/provider/global-provider';
import JsonLd from '@/components/provider/json-ld';
import KakaoOAuthScript from '@/components/provider/kakao-oauth-script';
import { metadataMap } from '@/lib/metadata';
import { cn } from '@/lib/utils';
import { GoogleAnalytics } from '@next/third-parties/google';

import './globals.css';

export const metadata: Metadata = metadataMap.root;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  interactiveWidget: 'resizes-visual',
};

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

const montserrat = Montserrat({
  weight: ['700'],
  subsets: [],
  variable: '--font-montserrat',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={cn(
          pretendard.className,
          montserrat.variable,
          'relative bg-white max-w-dvw overflow-x-hidden'
        )}
      >
        <GlobalProvider>{children}</GlobalProvider>
        <KakaoOAuthScript />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        <JsonLd />
      </body>
    </html>
  );
}
