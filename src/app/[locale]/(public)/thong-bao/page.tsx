import type { Metadata } from "next";
import { ArticleNotificationList } from "@/features/notification/components/ArticleNotificationList";
import { Breadcrumb } from "@/shared/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Thông báo bài viết mới",
  description: "Các bài viết và thông tin mới được cập nhật từ nhà trường.",
};

export default function NotificationsPage() {
  return (
    <main className="bg-section-alt min-h-screen">
      <div className="site-container py-7 sm:py-10 lg:py-12">
        <Breadcrumb items={[{ name: "Trang chủ", href: "/" }, { name: "Thông báo" }]} />
        <div className="mt-7 mb-7 max-w-3xl">
          <p className="text-brand-orange text-sm font-bold">Cập nhật từ nhà trường</p>
          <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Thông báo bài viết mới
          </h1>
          <p className="text-muted-foreground mt-3 text-base leading-7">
            Theo dõi các tin tức, thông báo và thông tin tuyển sinh vừa được xuất bản.
          </p>
        </div>
        <ArticleNotificationList />
      </div>
    </main>
  );
}
