import localFont from 'next/font/local';

export const integralCF = localFont({
  src: [
    {
      path: '../assets/fonts/IntergralCF/Fontspring-DEMO-integralcf-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-integral',
  display: 'swap',
});

export const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../assets/fonts/satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/satoshi/Satoshi-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
