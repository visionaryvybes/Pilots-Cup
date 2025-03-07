import { siteConfig } from './metadata';

const routes = [
  '',
  '/about',
  '/rentals',
  '/membership',
  '/events',
  '/rankings',
  '/shop',
  '/contact',
  '/book',
];

export default async function sitemap() {
  const routeMap = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routeMap];
} 