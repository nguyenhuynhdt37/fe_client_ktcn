# Yêu cầu Chuẩn hóa & Cung cấp Danh sách Slug Danh mục Bài viết (Backend & Front-End)

Để đảm bảo việc tích hợp dữ liệu bài viết động từ Backend lên Trang chủ Front-End chính xác, không bị lỗi 404 và đồng bộ với cấu trúc điều hướng của website trường Đại học, tài liệu này mô tả danh sách các slug danh mục bài viết đề xuất và yêu cầu cấu hình từ phía Backend.

---

## 1. Vấn đề Hiện tại

Khi Front-End thực hiện gọi API lấy danh sách bài viết theo danh mục qua endpoint:
`GET /api/v1/categories/{category_slug}/articles`

Một số danh mục (ví dụ: Nghiên cứu khoa học) trả về mã lỗi **404 Not Found** hoặc danh sách rỗng, do sai lệch slug giữa cấu trúc dữ liệu trên Database/CMS của Backend và mã nguồn Front-End. 

Để tránh việc Front-End phải viết mã fallback cứng (ví dụ: thử gọi `nckh-va-doi-ngoai` rồi thử tiếp `nckh`), đề nghị phía Backend chuẩn hóa hoặc cung cấp danh sách slug chuẩn theo bảng dưới đây.

---

## 2. Danh sách Slug Danh mục Đề xuất (Chuẩn hóa)

Đề xuất Backend cấu hình chính xác các danh mục bài viết trên Database/CMS với các `slug` tương ứng như sau:

| STT | Tên Danh mục (Tiếng Việt) | Slug đề xuất (Front-End đang gọi) | Trạng thái hiện tại | Ghi chú |
|:---:|---|---|:---:|---|
| 1 | **Tin tức - Sự kiện** | `tin-tuc-va-su-kien` | OK | Hiển thị ở Tin tức nổi bật Trang chủ |
| 2 | **Thông báo** | `thong-bao` | OK | Hiển thị ở cột Thông báo Trang chủ |
| 3 | **Tuyển sinh** | `tuyen-sinh` | OK | Hiển thị ở Tab Tuyển sinh Trang chủ |
| 4 | **Sinh viên** | `sinh-vien` | OK | Hiển thị ở Hoạt động sinh viên Trang chủ |
| 5 | **Tuyển dụng** | `tuyen-dung` | OK | Hiển thị ở widget Tuyển dụng Trang chủ |
| 6 | **Nghiên cứu khoa học** | `nckh-va-doi-ngoai` | OK | Đã cập nhật slug trong Database của Backend |

---

## 3. Yêu cầu phối hợp từ Backend

Kính đề nghị team Backend hỗ trợ một trong hai phương án sau:

### Phương án A: Chuẩn hóa dữ liệu trên CMS/Database (Khuyên dùng)
Backend cấu hình lại trường `slug` của danh mục **Nghiên cứu khoa học** trên Database thành `nckh-va-doi-ngoai` để khớp hoàn toàn với cấu trúc định danh của menu trường.

### Phương án B: Cung cấp tài liệu danh sách Slug hiện tại
Nếu các slug danh mục trên Database là cố định và không thể thay đổi, Backend vui lòng cung cấp danh sách đầy đủ các slug danh mục bài viết đang hoạt động để Front-End cập nhật lại mã nguồn tương thích.

---

*Tài liệu này được biên soạn nhằm phục vụ việc tích hợp và kiểm thử giao diện Portal VinhUni.*
