import type { Metadata } from 'next';
import Providers from './Providers';
import { fonts } from './fonts';

import MainLayout from '@/layouts/MainLayout';

export const metadata: Metadata = {
  title: 'PALS',
  description: 'Payment and Loan Sharing',
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={fonts.rubik.variable}>
      <body>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
