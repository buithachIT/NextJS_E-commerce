import { satoshi, integralCF } from '@/config/fonts';
import './globals.css';
import { MSWProvider } from '@/contexts/MSWProvider';
import { Metadata } from 'next';
import ProgressBarProvider from '@/contexts/ProgressBarProvider';
import { Toaster } from 'react-hot-toast';
import { enableServerMocking } from '@/mocks/enableServerMocking';
import { AuthProvider } from '@/contexts/AuthContext';

// (async () => {
//   await enableServerMocking();
// })();

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
          <AuthProvider>
            <div className="min-h-screen lg:px-0">
              <div className="max-w-[1440x] mx-auto">
                <ProgressBarProvider>{children}</ProgressBarProvider>
                <Toaster />
              </div>
            </div>
          </AuthProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
