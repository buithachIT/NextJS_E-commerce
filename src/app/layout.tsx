if (
  process.env.NEXT_PUBLIC_ENABLE_MOCK === '1' &&
  typeof window === 'undefined'
) {
  import('@/mocks/enableServerMocking');
}
import { satoshi, integralCF } from '@/config/fonts';
import './globals.css';
import { MSWProvider } from '@/context/MSWProvider';
import { Metadata } from 'next';
import ProgressBarProvider from '@/context/ProgressBarProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Aurore',
  icons: '/assets/images/logo-aurore-small.png',
  description: 'Fashion shop',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${satoshi.variable} ${integralCF.variable} antialiased`}
    >



      <body>
        <MSWProvider>
          <div className="min-h-screen lg:px-0">
            <div className="max-w-[1440x] mx-auto">
              <ProgressBarProvider>{children}</ProgressBarProvider>
              <Toaster />
            </div>
          </div>
        </MSWProvider>
      </body>
    </html>
  );
}
