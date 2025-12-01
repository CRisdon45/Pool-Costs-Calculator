// Service Worker for Offline Functionality
const CACHE_NAME = 'pool-est-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './icon-generator.html'
];

// Install Event: Cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // Activate the service worker immediately after installation
    self.skipWaiting();
});

// Activate Event: cleanup old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((name) => {
                    if (name !== CACHE_NAME) {
                        return caches.delete(name);
                    }
                    return null;
                })
            );
        })
    );
    // Take control of uncontrolled clients immediately
    self.clients.claim();
});

// Fetch Event: Serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request).then((networkResponse) => {
                // Optionally cache the new resource
                if (event.request.method === 'GET' && networkResponse && networkResponse.status === 200 && event.request.destination !== 'document') {
                    const clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return networkResponse;
            });
        }).catch(() => {
            // If both cache and network fail, show a fallback for HTML pages
            if (event.request.mode === 'navigate') {
                return caches.match('./index.html');
            }
        })
    );
});
