import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProductProvider, useProductContext } from '../ProductVariantContext';
import React from 'react';
import { VariationType, StockStatusEnum } from '@/types/product';

const mockVariant: VariationType = {
  __typename: 'SimpleProductVariation',
  name: 'Red-M',
  price: '120',
  sku: 'SHIRT-RED-M',
  stockStatus: StockStatusEnum.InStock,
  regularPrice: '150',
};

function TestComponent() {
  const {
    selectedImage,
    setSelectedImage,
    selectedColor,
    setSelectedColor,
    selectedVariant,
    setSelectedVariant,
  } = useProductContext();

  return (
    <div>
      <span data-testid="image">{selectedImage || 'no-image'}</span>
      <span data-testid="color">{selectedColor || 'no-color'}</span>
      <span data-testid="variant-name">
        {selectedVariant ? selectedVariant.name : 'no-variant'}
      </span>
      <button onClick={() => setSelectedImage('/test.jpg')}>Set Image</button>
      <button onClick={() => setSelectedColor('Red')}>Set Color</button>
      <button onClick={() => setSelectedVariant(mockVariant)}>
        Set Variant
      </button>
    </div>
  );
}

describe('ProductVariantContext', () => {
  it('should have initial null values', () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    expect(screen.getByTestId('image').textContent).toBe('no-image');
    expect(screen.getByTestId('color').textContent).toBe('no-color');
    expect(screen.getByTestId('variant-name').textContent).toBe('no-variant');
  });

  it('should update selectedImage when setSelectedImage is called', () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    act(() => {
      screen.getByText('Set Image').click();
    });

    expect(screen.getByTestId('image').textContent).toBe('/test.jpg');
  });

  it('should update selectedColor when setSelectedColor is called', () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    act(() => {
      screen.getByText('Set Color').click();
    });

    expect(screen.getByTestId('color').textContent).toBe('Red');
  });

  it('should update selectedVariant when setSelectedVariant is called', () => {
    render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    act(() => {
      screen.getByText('Set Variant').click();
    });

    expect(screen.getByTestId('variant-name').textContent).toBe('Red-M');
  });
}); 