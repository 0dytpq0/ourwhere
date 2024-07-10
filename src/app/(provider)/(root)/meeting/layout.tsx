import KakaoShareScript from '@/lib/utils/KakaoShareScript';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
      <KakaoShareScript />
    </html>
  );
}
