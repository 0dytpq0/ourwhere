import Footer from '@/components/molecules/Footer';
import Header from '@/components/molecules/Header';
import { AuthStoreProvider } from '@/providers/js-auth.store.provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ourwhere',
  description: '친구들과 모임 일정 등을 공유하는 웹 플렛폼입니다!!!!',
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthStoreProvider>
          <Header />
          {children}
          <Footer />
        </AuthStoreProvider>
      </body>
    </html>
  );
}
