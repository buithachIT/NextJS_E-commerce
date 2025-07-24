import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from '../AuthContext';
import React from 'react';

// Mock các hàm fetchUserWithAutoRefresh và logoutUser
vi.mock('@/lib/action/auth', () => ({
  fetchUserWithAutoRefresh: vi.fn(),
  logoutUser: vi.fn(),
}));

import * as authActions from '@/lib/action/auth';
const fetchUserWithAutoRefresh = authActions.fetchUserWithAutoRefresh as unknown as ReturnType<typeof vi.fn>;
const logoutUser = authActions.logoutUser as unknown as ReturnType<typeof vi.fn>;

function TestComponent() {
  const { user, loading, refresh, logout } = useAuth();
  return (
    <div>
      <span data-testid="loading">{loading ? 'loading' : 'loaded'}</span>
      <span data-testid="user">{user ? user.email : 'no-user'}</span>
      <button onClick={refresh}>refresh</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show loading then user after fetchUserWithAutoRefresh resolves', async () => {
    fetchUserWithAutoRefresh.mockResolvedValueOnce({ email: 'test@example.com' });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    expect(screen.getByTestId('loading').textContent).toBe('loading');
    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('loaded'));
    expect(screen.getByTestId('user').textContent).toBe('test@example.com');
  });

  it('should set user to null if fetchUserWithAutoRefresh throws', async () => {
    fetchUserWithAutoRefresh.mockRejectedValueOnce(new Error('fail'));
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await waitFor(() => expect(screen.getByTestId('loading').textContent).toBe('loaded'));
    expect(screen.getByTestId('user').textContent).toBe('no-user');
  });

  it('should call logoutUser and set user to null on logout', async () => {
    fetchUserWithAutoRefresh.mockResolvedValueOnce({ email: 'test@example.com' });
    logoutUser.mockResolvedValueOnce();
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('test@example.com'));
    screen.getByText('logout').click();
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('no-user'));
    expect(logoutUser).toHaveBeenCalled();
  });

  it('should call fetchUserWithAutoRefresh again when refresh is called', async () => {
    fetchUserWithAutoRefresh.mockResolvedValueOnce({ email: 'test@example.com' });
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('test@example.com'));
    fetchUserWithAutoRefresh.mockResolvedValueOnce({ email: 'new@example.com' });
    screen.getByText('refresh').click();
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('new@example.com'));
    expect(fetchUserWithAutoRefresh).toHaveBeenCalledTimes(2);
  });
}); 