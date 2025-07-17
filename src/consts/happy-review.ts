import { ReviewNode } from '@/types/review';

export const happyReview: ReviewNode[] = [
  {
    id: '1',
    rating: 5,
    content: '<p>Great product! Highly recommend.</p>',
    author: { node: { name: 'Alice' } },
    date: '2025-07-15T08:00:00',
  },
  {
    id: '2',
    rating: 4,
    content: '<p>Good quality, but delivery was slow.</p>',
    author: { node: { name: 'Bob' } },
    date: '2025-07-14T10:30:00',
  },
  {
    id: '3',
    rating: 5,
    content: '<p>Excellent! Will buy again.</p>',
    author: { node: { name: 'Carol' } },
    date: '2025-07-13T09:15:00',
  },
  {
    id: '4',
    rating: 3,
    content: '<p>Average product, not bad.</p>',
    author: { node: { name: 'David' } },
    date: '2025-07-12T14:45:00',
  },
  {
    id: '5',
    rating: 5,
    content: '<p>Perfect fit and great material.</p>',
    author: { node: { name: 'Eve' } },
    date: '2025-07-11T13:00:00',
  },
  {
    id: '6',
    rating: 2,
    content: '<p>Not what I expected, disappointed.</p>',
    author: { node: { name: 'Frank' } },
    date: '2025-07-10T11:20:00',
  },
  {
    id: '7',
    rating: 4,
    content: '<p>Nice product, but packaging could improve.</p>',
    author: { node: { name: 'Grace' } },
    date: '2025-07-09T17:35:00',
  },
  {
    id: '8',
    rating: 5,
    content: '<p>Loved it, very comfortable!</p>',
    author: { node: { name: 'Hank' } },
    date: '2025-07-08T15:10:00',
  },
  {
    id: '9',
    rating: 3,
    content: '<p>Okay product, works as described.</p>',
    author: { node: { name: 'Ivy' } },
    date: '2025-07-07T12:00:00',
  },
  {
    id: '10',
    rating: 5,
    content: '<p>Highly recommend for anyone!</p>',
    author: { node: { name: 'Jack' } },
    date: '2025-07-06T08:50:00',
  },
];
