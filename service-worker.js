// service-worker.js
self.addEventListener('install', (event) => {
    console.log('Service Worker суулгалаа');
    event.waitUntil(
      caches.open('pwa-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/app.js',
          '/icon-192x192.png'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker амжилттай бүртгэгдлээ:', registration);
        })
        .catch(error => {
          console.log('Service Worker бүртгэх үед алдаа гарлаа:', error);
        });
    });
  }
  