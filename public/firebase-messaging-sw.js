// Firebase Messaging Service Worker for background push notifications
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAp-Tk7DAu6fZCY214QmVr0Q3VVeCetQlk",
  authDomain: "movies-5f325.firebaseapp.com",
  databaseURL: "https://movies-5f325-default-rtdb.firebaseio.com",
  projectId: "movies-5f325",
  storageBucket: "movies-5f325.firebasestorage.app",
  messagingSenderId: "446677150841",
  appId: "1:446677150841:web:c15d24d9cf33f243c5b8a8"
};

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon, image } = payload.notification || {};
  const notifTitle = title || 'NEXTGEN CINEMA';
  const brandIcon = 'https://i.ibb.co/fdnZyvB4/IMG-20260325-090648-537-2.jpg';
  const notifOptions = {
    body: body || '',
    icon: icon || brandIcon,
    image: image || undefined,
    badge: brandIcon,
    vibrate: [200, 100, 200],
    data: payload.data || {},
    tag: `rsanime-bg-${Date.now()}`,
  };
  self.registration.showNotification(notifTitle, notifOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const rawUrl = event.notification.data?.url || '/';
  const url = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
    ? rawUrl
    : `${self.location.origin}${rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`}`;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.focus();
          if ('navigate' in client) return client.navigate(url);
          return client;
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
