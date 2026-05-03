"use client";

import { useState, useCallback, useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage, Messaging } from "firebase/messaging";

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useState(false);

  // Check if already granted on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setIsEnabled(Notification.permission === "granted");
    }
  }, []);

  const initNotifications = useCallback(async () => {
    if (typeof window === "undefined" || !messaging) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging as Messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
        });

        if (token) {
          setIsEnabled(true);
          new Notification("Stock Alerts Active", {
            body: "You will now receive emergency hospital stock updates.",
            icon: "/logo.png"
          });
        }

        onMessage(messaging as Messaging, (payload) => {
          if (payload.notification) {
            new Notification(payload.notification.title || "Hospital Alert", {
              body: payload.notification.body,
              icon: "/logo.png",
            });
          }
        });
      }
    } catch (error) {
      console.error("FCM Setup Error:", error);
    }
  }, []);

  return { initNotifications, isEnabled };
}