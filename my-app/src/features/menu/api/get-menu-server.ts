import { MenuTreeResponse } from "../types";

import { getLanguageHeader } from "@/shared/api/server-api-helper";

export async function getMenuTreeServer(code: string): Promise<MenuTreeResponse | null> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const langHeader = await getLanguageHeader();
  
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/menus/code/${code}`, {
      headers: {
        ...langHeader
      },
      // Revalidate sau mỗi 1 giờ
      next: { 
        revalidate: 3600
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch menu tree: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching menu server-side:", error);
    return null;
  }
}
