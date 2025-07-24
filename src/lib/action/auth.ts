import { GetCurrentUserQuery } from '@/__generated__/graphql';
import parse from 'html-react-parser'
export async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    let msg = errorData?.message || 'Login failed.';
    msg = parse(msg);
    throw new Error(msg.trim());
  }
  return { success: true };
}
export async function fetchUserWithAutoRefresh(): Promise<
  GetCurrentUserQuery['viewer'] | null
> {
  try {
    let res = await fetch('/api/user/fetchUser', {
      credentials: 'include',
    });

    if (res.status === 401) {
      const refreshRes = await fetch('/api/user/refresh', {
        method: 'POST',
        credentials: 'include',
      });

      if (refreshRes.ok) {
        res = await fetch('/api/user/fetchUser', {
          credentials: 'include',
        });
      } else {
        console.warn('[Auth] Refresh failed');
        return null;
      }
    }
    if (res.ok) {
      const data = await res.json();
      return data as GetCurrentUserQuery['viewer'];
    }

    return null;
  } catch (err) {
    console.error('[Auth] fetchUser failed:', err);
    return null;
  }
}

export async function registerUser({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) {
  const res = await fetch('/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error('Register error response:', data);
    throw new Error(data?.message || 'Register failed.Client');
  }
  return data;
}

export async function logoutUser() {
  const res = await fetch('/api/user/logout', {
    method: 'POST',
  });

  if (!res.ok) {
    throw new Error('Logout failed.');
  }

  return await res.json();
}
