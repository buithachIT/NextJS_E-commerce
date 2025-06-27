import localFont from 'next/font/local';

export const integralCF = localFont({
  src: [
    {
      path: '../fonts/IntergralCF/Fontspring-DEMO-integralcf-bold.otf',
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
      path: '../fonts/satoshi/Satoshi-Light.otf',
      weight: '300',
      style: 'light',
    },
    {
      path: '../fonts/satoshi/Satoshi-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/satoshi/Satoshi-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});
