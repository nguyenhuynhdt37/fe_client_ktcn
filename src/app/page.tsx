import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Tự động xác định locale và redirect từ trang chủ không locale về locale phù hợp
export default async function RootPage() {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value || cookieStore.get("NEXT_LOCALE")?.value;

  // 1. Nếu có cookie do người dùng chọn trước đó, redirect sang locale đó
  if (cookieLocale) {
    redirect(`/${cookieLocale}`);
  }

  // 2. Nếu chưa có cookie, gọi API ngôn ngữ công khai tìm ngôn ngữ mặc định (is_default: true)
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  try {
    const res = await fetch(`${apiBaseUrl}/api/v1/portal/languages`, {
      next: {
        revalidate: 3600, // Cache 1 giờ
      },
    });

    if (res.ok) {
      const languages = await res.json();
      const defaultLang = languages.find((lang: any) => lang.is_default);
      if (defaultLang && defaultLang.code) {
        redirect(`/${defaultLang.code}`);
      }
    }
  } catch (error) {
    console.error("Failed to fetch default language from API, falling back to /vi", error);
  }

  // Fallback về locale mặc định
  redirect("/vi");
}
