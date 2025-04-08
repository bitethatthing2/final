/* eslint-disable no-restricted-globals */

// Firebase Service Worker for Background Push Notifications

// Skip waiting to ensure the latest service worker is activated
self.addEventListener('install', function(event) {
  self.skipWaiting();
});

// Basic Firebase app configuration
// Note: This is a minimal config needed for FCM in the service worker
// The actual config should match your Firebase project
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Will be replaced at runtime with injected config
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Service worker version for debugging
const SW_VERSION = '1.0.2';
console.log(`[Firebase SW v${SW_VERSION}] Service Worker initializing...`);

// Load Firebase scripts dynamically
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('[Firebase SW] Received background message:', payload);

  // Customize notification based on payload
  const notificationTitle = payload.notification?.title || "Hustle Hard Update";
  const notificationOptions = {
    body: payload.notification?.body || "Check out what's new!",
    icon: '/icons/icons/icon-192x192.png',
    badge: '/icons/icons/icon-72x72.png',
    tag: payload.data?.tag || 'hustle-hard-notification',
    data: {
      url: payload.data?.url || '/',
      timestamp: Date.now(),
      swVersion: SW_VERSION
    },
    actions: [
      {
        action: 'view',
        title: 'View Details',
      },
    ],
  };

  // Show the notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[Firebase SW] Notification clicked:', event);
  
  // Close the notification
  event.notification.close();
  
  // Get the notification data
  const notificationData = event.notification.data;
  
  // Handle action clicks
  if (event.action === 'view') {
    // Custom action handling
    console.log('[Firebase SW] "View Details" action clicked');
  }
  
  // This will open the app and navigate to the URL specified in the notification
  const urlToOpen = notificationData?.url || '/';
  
  // Open or focus the client
  event.waitUntil(
    clients.matchAll({type: 'window'}).then(function(clientList) {
      // If a window client is already open, focus it
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          client.focus();
          if ('navigate' in client) {
            client.navigate(urlToOpen);
            return;
          }
        }
      }
      
      // If no window client is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});
