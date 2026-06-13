"use client";

import { useState, useCallback } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage, Messaging } from "firebase/messaging";

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      return Notification.permission === "granted";
    }
    return false;
  });

  // Function to initialize - triggered by your button click
  const initNotifications = useCallback(async () => {
    if (typeof window === "undefined" || !messaging) return;

    const messagingInstance = messaging as Messaging;

    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission denied");
        return;
      }

      const token = await getToken(messagingInstance, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
      });

      if (token) {
        console.log("Device Token registered:", token);
        setIsEnabled(true);
        
        // Local "Success" Alert
        new Notification("⚠️ Low Stock Alert: Oxygen Cylinder", {
          body: "Current inventory: 85. Threshold is 100. Please reorder immediately to avoid depletion.",
          icon: "/logo.png"
        });
      }

      // Listen for foreground messages
      onMessage(messagingInstance, (payload) => {
        if (payload.notification) {
          new Notification(payload.notification.title || "New Message", {
            body: payload.notification.body,
            icon: "/logo.png",
          });
        }
      });
    } catch (error) {
      console.error("Notification setup failed:", error);
    }
  }, []);

  return {
    initNotifications,
    isEnabled
  };
}