"use client";

import { useEffect } from "react";
import { messaging } from "@/lib/firebase"; // Ensure this matches your file path
import { getToken, onMessage, Messaging } from "firebase/messaging";

export function useNotifications() {
  useEffect(() => {
    // 1. Guard clause: Ensure we are on the client and messaging is initialized
    if (typeof window === "undefined" || !messaging) return;

    // We cast to Messaging here because we've already checked for null above
    const messagingInstance = messaging as Messaging;

    const setupNotifications = async () => {
      try {
        // 2. Request Browser Permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission denied");
          return;
        }

        // 3. Get the Device Token
        // CRITICAL: Replace the string below with your actual VAPID key from Firebase Console
        const token = await getToken(messagingInstance, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
        });

        if (token) {
          console.log("Device Token registered:", token);
          // TODO: Send this token to your backend via an API call
        }

        // 4. Listen for Foreground Messages
        const unsubscribe = onMessage(messagingInstance, (payload) => {
          console.log("Foreground message received:", payload);
          
          // Trigger a local browser popup
          if (payload.notification) {
            new Notification(payload.notification.title || "New Message", {
              body: payload.notification.body,
              icon: "/logo.png", // Ensure this exists in your public folder
            });
          }
        });

        return unsubscribe;

      } catch (error) {
        console.error("Notification setup failed:", error);
      }
    };

    setupNotifications();
  }, []);
}