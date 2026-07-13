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
  console.log("PushNotificationManager component rendered!");
  const [showBanner, setShowBanner] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  useEffect(() => {
    console.log("PushNotificationManager mounted. Browser check:", {
      hasSW: "serviceWorker" in navigator,
      hasPush: "PushManager" in window,
      permission: Notification.permission,
      dismissed: localStorage.getItem("push-notification-dismissed")
    });

    if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.log("PushNotificationManager aborting: Missing browser APIs");
      return;
    }

    // Đăng ký Service Worker
    navigator.serviceWorker.register("/sw.js")
      .then((reg) => {
        console.log("Service Worker registered successfully:", reg.scope);
        
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

      // 2. Trình duyệt subscribe nhận thông báo đẩy
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
      });

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
      console.log("Push Notification subscription synced with backend");
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
    <div className="fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl border border-white/20 bg-background/80 backdrop-blur-xl p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
      <div className="flex gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary animate-bounce">
          <Bell className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-foreground">Nhận thông báo đẩy</h3>
            <button
              onClick={handleDismiss}
              className="rounded-full p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              aria-label="Đóng"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
            Cho phép chúng tôi gửi cho bạn những tin tức và thông báo quan trọng từ nhà trường ngay cả khi bạn không mở trang web.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              {isSubscribing ? "Đang đăng ký..." : "Đồng ý nhận"}
            </button>
            <button
              onClick={handleDismiss}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-3.5 py-2 text-xs font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Bỏ qua
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
