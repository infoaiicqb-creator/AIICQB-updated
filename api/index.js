import app from './app.js';

export default function handler(req, res) {
  // If Vercel rewrote the URL and stripped the path, restore from headers
  const originalUrl = req.headers['x-vercel-matched-path'] || req.headers['x-matched-path'] || req.headers['x-forwarded-uri'] || req.url;
  if (originalUrl && originalUrl.startsWith('/api') && (!req.url || req.url === '/' || req.url === '/api')) {
    req.url = originalUrl;
  }
  return app(req, res);
}
