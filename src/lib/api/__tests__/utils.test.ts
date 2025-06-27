import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiPath } from '../utils';

describe('apiPath utility', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset the process.env before each test
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  it('should use the default base URL when NEXT_PUBLIC_API_URL is not set', () => {
    // Ensure the env variable is not set for this test
    delete process.env.NEXT_PUBLIC_API_URL;

    const path = '/v1/products';
    const expectedUrl = `http://localhost:3000${path}`;

    expect(apiPath(path)).toBe(expectedUrl);
  });

  it('should use the NEXT_PUBLIC_API_URL from environment variables when it is set', () => {
    const customApiUrl = 'https://api.example.com';
    process.env.NEXT_PUBLIC_API_URL = customApiUrl;

    const path = '/v1/users';
    const expectedUrl = `${customApiUrl}${path}`;

    expect(apiPath(path)).toBe(expectedUrl);
  });

  it('should handle an empty pathname correctly', () => {
    const baseUrl = 'https://api.test.com';
    process.env.NEXT_PUBLIC_API_URL = baseUrl;

    const path = '';
    expect(apiPath(path)).toBe(baseUrl);
  });

  it('should handle pathnames that do not start with a slash', () => {
    const path = 'v1/auth/login';
    const expectedUrl = `http://localhost:3000${path}`;
    expect(apiPath(path)).toBe(expectedUrl);
  });
});
