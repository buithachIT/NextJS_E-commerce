import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Breadcrumb from '../breadcrumb';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom/vitest';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('Breadcrumb component', () => {
  it('should render only the Home link on the root path', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    render(<Breadcrumb />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');

    const separators = screen.queryAllByText('›');
    expect(separators.length).toBe(0);
  });

  it('should render a single-level path correctly', () => {
    vi.mocked(usePathname).mockReturnValue('/products');
    render(<Breadcrumb />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    expect(screen.getByText('›')).toBeInTheDocument();

    const currentPage = screen.getByText(/products/i);
    expect(currentPage).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /products/i })).toBeNull();
  });

  it('should render a multi-level path correctly', () => {
    vi.mocked(usePathname).mockReturnValue('/category/men/shirts');
    render(<Breadcrumb />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const categoryLink = screen.getByRole('link', { name: /category/i });
    const menLink = screen.getByRole('link', { name: /men/i });

    expect(homeLink).toHaveAttribute('href', '/');
    expect(categoryLink).toHaveAttribute('href', '/category');
    expect(menLink).toHaveAttribute('href', '/category/men');
    expect(screen.queryByRole('link', { name: /shirts/i })).toBeNull();

    const separators = screen.queryAllByText('›');
    expect(separators.length).toBe(3);
  });

  it('should correctly format labels with hyphens and decode URIs', () => {
    vi.mocked(usePathname).mockReturnValue('/top-deals/special%20offer');
    render(<Breadcrumb />);

    const topDealsLink = screen.getByRole('link', { name: /top deals/i });
    const specialOfferText = screen.getByText(/special offer/i);

    expect(topDealsLink).toBeInTheDocument();
    expect(topDealsLink).toHaveAttribute('href', '/top-deals');
    expect(specialOfferText).toBeInTheDocument();
  });

  it('should ignore the last segment if it resembles an ID', () => {
    vi.mocked(usePathname).mockReturnValue(
      '/product/a-very-long-product-id-12345'
    );
    render(<Breadcrumb />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    const productText = screen.getByText(/product/i);

    expect(homeLink).toBeInTheDocument();
    expect(productText).toBeInTheDocument();

    expect(screen.queryByRole('link', { name: /product/i })).toBeNull();
    expect(
      screen.queryByText(/a-very-long-product-id-12345/i)
    ).not.toBeInTheDocument();
  });

  it('should not ignore a short last segment that does not look like an ID', () => {
    vi.mocked(usePathname).mockReturnValue('/blog/short');
    render(<Breadcrumb />);

    const blogLink = screen.getByRole('link', { name: /blog/i });
    const shortText = screen.getByText(/short/i);

    expect(blogLink).toBeInTheDocument();
    expect(shortText).toBeInTheDocument();
  });
});
