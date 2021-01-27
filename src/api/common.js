export const DEFAULT_GET = {
  method: 'GET',
  credentials: 'include',
};

export const DEFAULT_POST = {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
};

export const formatCookies = (cookies) =>
  Object.entries(cookies)
    .map(([v, k]) => `${v}=${k}`)
    .flat()
    .join(';');
