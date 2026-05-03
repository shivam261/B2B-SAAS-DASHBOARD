"use client";

import { useEffect } from "react";
import { messaging } from "@/lib/firebase";
import { getToken, onMessage, Messaging } from "firebase/messaging";

export function useNotifications() {
  useEffect(() => {
    if (typeof window === "undefined" || !messaging) return;

    const messagingInstance = messaging as Messaging;
    let unsubscribe: (() => void) | undefined;

    const setupNotifications = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return;

        const token = await getToken(messagingInstance, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY 
        });

        if (token) {
          console.log("Device Token registered:", token);
          // Optional: Only show this once per session or on first grant
          new Notification("Hospital System Active", {
            body: "You will now receive real-time stock alerts.",
            icon: "/logo.png"
          });
        }

        // Assign the unsubscribe function to our outer variable
        unsubscribe = onMessage(messagingInstance, (payload) => {
          if (payload.notification) {
            new Notification(payload.notification.title || "Stock Alert", {
              body: payload.notification.body,
              icon: "/logo.png",
            });
          }
        });
      } catch (error) {
        console.error("Notification setup failed:", error);
      }
    };

    setupNotifications();

    // Cleanup: This runs when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);
}