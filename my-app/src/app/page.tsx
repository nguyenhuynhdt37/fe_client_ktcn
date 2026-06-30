import { redirect } from "next/navigation";

// Tự động redirect từ trang chủ không locale về locale mặc định
export default function RootPage() {
  redirect("/vi");
}
