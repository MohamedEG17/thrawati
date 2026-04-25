// Service Worker - No Cache Strategy
const CACHE = 'thrawati-v3';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  // حذف كل الـ caches القديمة
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Supabase requests - دايماً من النت مش من الـ cache
  if (e.request.url.includes('supabase.co')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // باقي الملفات - network first
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
