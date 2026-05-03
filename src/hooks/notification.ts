"use client";

import { useState, useCallback, useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage, Messaging } from "firebase/messaging";

export function useNotifications() {
  const [isEnabled, setIsEnabled] = useState(false);

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
        new Notification("Hospital System Active", {
          body: "Stock alerts are now enabled.",
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

  // Check existing permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        setIsEnabled(true);
      }
    }
  }, []);

  // THIS IS THE PART YOU WERE MISSING:
  return {
    initNotifications,
    isEnabled
  };
}