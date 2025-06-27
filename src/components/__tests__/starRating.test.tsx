import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import StarRating from '../starRating';

// Mock the icon components to make them identifiable in tests
vi.mock('../ui/icons', () => ({
  Star: () => <div data-testid="full-star" />,
  HalfStar: () => <div data-testid="half-star" />,
}));

describe('StarRating Component', () => {
  it('should render 5 full stars for a rating of 5', () => {
    render(<StarRating rating={5} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');

    expect(fullStars).toHaveLength(5);
    expect(halfStars).toHaveLength(0);
  });

  it('should render 3 full stars and 1 half star for a rating of 3.5', () => {
    render(<StarRating rating={3.5} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');

    expect(fullStars).toHaveLength(3);
    expect(halfStars).toHaveLength(1);
  });

  it('should render 4 full stars for a rating of 4.2', () => {
    // The logic is `rating >= i`, so 4.2 will render 4 full stars.
    render(<StarRating rating={4.2} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');

    expect(fullStars).toHaveLength(4);
    expect(halfStars).toHaveLength(0);
  });

  it('should render 0 stars for a rating of 0', () => {
    render(<StarRating rating={0} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');

    expect(fullStars).toHaveLength(0);
    expect(halfStars).toHaveLength(0);
  });

  it('should render 2 full stars and 1 half star for a rating of 2.7', () => {
    // The logic is `rating >= i - 0.5`, so 2.7 will render 2 full and 1 half star.
    render(<StarRating rating={2.7} />);
    const fullStars = screen.queryAllByTestId('full-star');
    const halfStars = screen.queryAllByTestId('half-star');

    expect(fullStars).toHaveLength(2);
    expect(halfStars).toHaveLength(1);
  });
});
