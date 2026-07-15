import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Mẫu trang Đào tạo đại học",
  robots: { index: false, follow: false },
};

export default async function UndergraduatePrototypePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  redirect(`/${locale}/dao-tao/dai-hoc/ky-thuat-dien-tu-vien-thong`);
}
