import { apiUrl, serverBaseUrl } from '@/lib/config';

describe('config urls', () => {
  it('apiUrl y serverBaseUrl deben ser strings', () => {
    expect(typeof apiUrl).toBe('string');
    expect(typeof serverBaseUrl).toBe('string');
  });

  it('apiUrl debe cambiar según NODE_ENV', () => {
    if (process.env.NODE_ENV === 'development') {
      expect(apiUrl).toBe('/api');
    } else {
      expect(apiUrl.startsWith('http')).toBe(true);
    }
  });
});
