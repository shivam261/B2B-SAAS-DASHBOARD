importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyCZdjizbJ95flnxwDXB26RoVEgKEdqg8M4", // Paste values directly here or use a build step
  authDomain: "ragaai-9ec6b.firebaseapp.com",
  projectId: "ragaai-9ec6b",
  storageBucket:"ragaai-9ec6b.firebasestorage.app",
  messagingSenderId: "224386444283",
  appId:"1:224386444283:web:8ab865740add09b616795e"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo.png', // path to your icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});