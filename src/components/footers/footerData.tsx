import { ROUTES } from '@/config/routes';

export const footerLinks = [
  {
    title: 'COMPANY',
    links: [
      { label: 'About', link: ROUTES.ABOUT },
      { label: 'Features', link: ROUTES.PRODUCT },
      { label: 'Works', link: ROUTES.PRODUCT },
      { label: 'Career', link: ROUTES.PROFILE },
    ],
  },
  {
    title: 'HELP',
    links: [
      { label: 'Customers Support', link: ROUTES.CONTACT },
      { label: 'Delivery Details', link: ROUTES.CHECKOUT_SHIPPING },
      { label: 'Terms & Conditions', link: ROUTES.TERMS },
      { label: 'Privacy Policy', link: ROUTES.PRIVACY },
    ],
  },
  {
    title: 'FAQ',
    links: [
      { label: 'Account', link: ROUTES.PROFILE },
      { label: 'Manage Deliveries', link: ROUTES.CHECKOUT },
      { label: 'Orders', link: ROUTES.PROFILE_ORDERS },
      { label: 'Payments', link: ROUTES.CHECKOUT_PAYMENT },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Free eBooks', link: '/resources/ebooks' },
      { label: 'Development Tutorial', link: '/resources/tutorials' },
      { label: 'How to - Blog', link: '/blog' },
      { label: 'Youtube playlist', link: 'https://youtube.com/...' },
    ],
  },
];
