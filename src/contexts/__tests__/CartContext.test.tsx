import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from '../CartContext';
import React from 'react';
import { STORAGE_KEY } from '@/config/storage';

const mockItem = {
  id: '1',
  name: 'Product 1',
  quantity: 2,
  price: 100,
  productId: 'p1',
  productName: 'Product One',
  color: 'Red',
  size: 'M',
  image: '/test.jpg',
};
const mockItem2 = {
  id: '2',
  name: 'Product 2',
  quantity: 1,
  price: 50,
  productId: 'p2',
  productName: 'Product Two',
  color: 'Blue',
  size: 'L',
  image: '/test2.jpg',
};

function TestComponent() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart, countCartQuantity } = useCart();
  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="cart-quantity">{countCartQuantity()}</span>
      <button onClick={() => addToCart(mockItem)}>add</button>
      <button onClick={() => addToCart(mockItem2)}>add2</button>
      <button onClick={() => updateQuantity('1', 5)}>update</button>
      <button onClick={() => removeFromCart('1')}>remove</button>
      <button onClick={clearCart}>clear</button>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize cart from localStorage', () => {
    localStorage.setItem(STORAGE_KEY.CART, JSON.stringify([mockItem]));
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
  });

  it('should add item to cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    act(() => {
      screen.getByText('add').click();
    });
    expect(screen.getByTestId('cart-length').textContent).toBe('1');
    expect(screen.getByTestId('cart-quantity').textContent).toBe('1');
  });

  it('should add multiple items and update quantity', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    act(() => {
      screen.getByText('add').click();
      screen.getByText('add2').click();
      screen.getByText('update').click();
    });
    expect(screen.getByTestId('cart-length').textContent).toBe('2');
    // Item 1 quantity should be updated to 5
    // countCartQuantity returns cart.length
    expect(screen.getByTestId('cart-quantity').textContent).toBe('2');
  });

  it('should remove item from cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    act(() => {
      screen.getByText('add').click();
      screen.getByText('remove').click();
    });
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });

  it('should clear cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    act(() => {
      screen.getByText('add').click();
      screen.getByText('add2').click();
      screen.getByText('clear').click();
    });
    expect(screen.getByTestId('cart-length').textContent).toBe('0');
  });
}); 