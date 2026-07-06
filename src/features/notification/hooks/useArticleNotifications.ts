"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosClient } from "@/shared/api/axios-client";
import type { PortalArticleListResponse } from "@/features/article";

const STORAGE_KEY = "ktcn:article-notifications:read:v1";

interface NotificationResponse {
  items: PortalArticleListResponse[];
}

function readStoredIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

function saveStoredIds(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(ids).slice(-200)));
}

export function useArticleNotifications(limit = 20) {
  const [items, setItems] = useState<PortalArticleListResponse[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const response = await axiosClient.get<NotificationResponse>("/api/v1/portal/articles", {
        params: {
          page: 1,
          page_size: limit,
          sort_by: "published_at",
          sort_dir: "desc",
        },
      });
      setItems(response.data.items || []);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    const hydrateReadState = window.setTimeout(() => {
      setReadIds(new Set(readStoredIds()));
    }, 0);
    const initialRefresh = window.setTimeout(() => {
      void refresh();
    }, 0);
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      window.clearTimeout(hydrateReadState);
      window.clearTimeout(initialRefresh);
      window.clearInterval(interval);
    };
  }, [refresh]);

  const markRead = useCallback((id: string) => {
    setReadIds((current) => {
      const next = new Set(current);
      next.add(id);
      saveStoredIds(next);
      return next;
    });
  }, []);

  const markAllRead = useCallback(() => {
    setReadIds((current) => {
      const next = new Set(current);
      items.forEach((item) => next.add(item.id));
      saveStoredIds(next);
      return next;
    });
  }, [items]);

  const markUnread = useCallback((id: string) => {
    setReadIds((current) => {
      const next = new Set(current);
      next.delete(id);
      saveStoredIds(next);
      return next;
    });
  }, []);

  const unreadCount = useMemo(
    () => items.reduce((total, item) => total + (readIds.has(item.id) ? 0 : 1), 0),
    [items, readIds],
  );

  return {
    items,
    readIds,
    unreadCount,
    isLoading,
    hasError,
    markRead,
    markUnread,
    markAllRead,
    refresh,
  };
}
