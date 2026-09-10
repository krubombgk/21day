// firebase-messaging-sw.js
// จำเป็นสำหรับฟีเจอร์แจ้งเตือน (push notification) — ต้องอยู่ที่ root ของเว็บ (โฟลเดอร์เดียวกับ index.html) เท่านั้น
// เบราว์เซอร์เรียกไฟล์นี้เองอัตโนมัติตอนกด "เปิดแจ้งเตือน" ในแอป ห้ามเปลี่ยนชื่อไฟล์หรือย้ายตำแหน่ง

importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

// ต้องตรงกับ firebaseConfig ตัวเดียวกับที่ใช้ใน index.html เป๊ะๆ (โปรเจกต์ day-challenge-saltsmart)
firebase.initializeApp({
  apiKey: "AIzaSyBehgaSNdTeL5OeAqSkYim72_6WNjI5bpw",
  authDomain: "day-challenge-saltsmart.firebaseapp.com",
  projectId: "day-challenge-saltsmart",
  storageBucket: "day-challenge-saltsmart.firebasestorage.app",
  messagingSenderId: "41386701617",
  appId: "1:41386701617:web:639c31b79cb155bb0ff610"
});

const messaging = firebase.messaging();

// แจ้งเตือนตอนแอปไม่ได้เปิดอยู่ (background) — เด้งเป็น system notification ปกติของเครื่อง
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "21 Days Challenge";
  const options = {
    body: payload.notification?.body || "",
    icon: "icon-192.png",
    badge: "icon-192.png"
  };
  self.registration.showNotification(title, options);
});

// กดที่ตัวแจ้งเตือนแล้วเปิดแอปขึ้นมาให้เลย (หรือโฟกัสแท็บที่เปิดอยู่แล้วถ้ามี)
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("./index.html");
      }
    })
  );
});
