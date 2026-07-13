"use client";

import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import { axiosClient } from "@/shared/api/axios-client";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function PushNotificationManager() {
  const [showBanner, setShowBanner] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      return;
    }

    // Đăng ký Service Worker
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => {
        console.log(
          "%c🔔 Web Push %c Service Worker registered successfully! Scope: " + reg.scope,
          "background: #3b82f6; color: white; padding: 3px 6px; border-radius: 4px 0 0 4px; font-weight: bold; font-family: system-ui, sans-serif;",
          "background: #dbeafe; color: #1e3a8a; padding: 3px 6px; border-radius: 0 4px 4px 0; font-family: system-ui, sans-serif;"
        );
        
        // Nếu đã được cấp quyền từ trước, tự động cập nhật/đăng ký lại subscription với backend
        if (Notification.permission === "granted") {
          updateSubscription(reg);
        } else if (Notification.permission === "default") {
          // Nếu chưa chọn, kiểm tra xem người dùng đã từng tắt banner xin quyền chưa
          const dismissed = localStorage.getItem("push-notification-dismissed");
          if (!dismissed) {
            // Hiển thị banner xin quyền sau 3 giây để tránh làm phiền ngay lập tức
            const timer = setTimeout(() => setShowBanner(true), 3000);
            return () => clearTimeout(timer);
          }
        }
      })
      .catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
  }, []);

  const updateSubscription = async (registration: ServiceWorkerRegistration) => {
    try {
      // 1. Lấy VAPID public key từ backend
      const res = await axiosClient.get("/api/v1/portal/notifications/vapid-public-key");
      const vapidPublicKey = res.data.public_key;

      if (!vapidPublicKey) {
        console.warn("VAPID public key is empty");
        return;
      }

      // 2. Trình duyệt kiểm tra và subscribe nhận thông báo đẩy
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      const existingSubscription = await registration.pushManager.getSubscription();
      let subscription = existingSubscription;

      if (existingSubscription) {
        const existingKey = existingSubscription.options.applicationServerKey;
        if (existingKey) {
          const existingKeyArray = new Uint8Array(existingKey);
          let keyMatches = existingKeyArray.length === convertedVapidKey.length;
          if (keyMatches) {
            for (let i = 0; i < convertedVapidKey.length; i++) {
              if (existingKeyArray[i] !== convertedVapidKey[i]) {
                keyMatches = false;
                break;
              }
            }
          }
          if (!keyMatches) {
            console.log("🔔 Web Push: VAPID Key changed, unsubscribing existing subscription...");
            await existingSubscription.unsubscribe();
            subscription = null;
          }
        } else {
          await existingSubscription.unsubscribe();
          subscription = null;
        }
      }

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });
      }

      // 3. Trích xuất keys dưới dạng base64 URL safe
      const p256dh = subscription.getKey("p256dh")
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("p256dh")!)))
        : "";
      const auth = subscription.getKey("auth")
        ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey("auth")!)))
        : "";

      const payload = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: p256dh,
          auth: auth,
        },
        user_agent: navigator.userAgent,
      };

      // 4. Gửi subscription lên Backend lưu trữ
      await axiosClient.post("/api/v1/portal/notifications/subscribe", payload);
      console.log(
        "%c🔔 Web Push %c Device subscription successfully synchronized with Backend! ",
        "background: #10b981; color: white; padding: 3px 6px; border-radius: 4px 0 0 4px; font-weight: bold; font-family: system-ui, sans-serif;",
        "background: #d1fae5; color: #065f46; padding: 3px 6px; border-radius: 0 4px 4px 0; font-family: system-ui, sans-serif; font-weight: 500;"
      );
    } catch (error) {
      console.error("Failed to update push subscription:", error);
    }
  };

  const handleSubscribe = async () => {
    if (!("serviceWorker" in navigator)) return;

    setIsSubscribing(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const registration = await navigator.serviceWorker.ready;
        await updateSubscription(registration);
        setShowBanner(false);
      } else {
        console.warn("Notification permission denied");
        localStorage.setItem("push-notification-dismissed", "true");
        setShowBanner(false);
      }
    } catch (err) {
      console.error("Error subscribing to push notifications:", err);
    } finally {
      setIsSubscribing(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("push-notification-dismissed", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed top-24 right-4 md:right-6 z-50 w-[calc(100%-2rem)] sm:w-80 rounded-xl border border-white/10 bg-card/95 backdrop-blur-md p-3.5 shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-top-5 max-w-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Bell className="h-4 w-4 animate-bounce" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-xs text-foreground truncate">Nhận thông báo đẩy?</h3>
          <p className="text-[10px] text-muted-foreground truncate">Cập nhật tin tức quan trọng từ nhà trường</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleSubscribe}
            disabled={isSubscribing}
            className="rounded-lg bg-primary px-3 py-1.5 text-[10px] font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {isSubscribing ? "..." : "Đồng ý"}
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Bỏ qua"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
