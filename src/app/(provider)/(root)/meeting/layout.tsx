import KakaoShareScript from '@/lib/utils/KakaoShareScript';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>{children}</div>
      <KakaoShareScript />
    </div>
  );
}
