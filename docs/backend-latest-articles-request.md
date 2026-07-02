# Yêu cầu Cung cấp API Lấy Danh sách Bài viết Mới nhất Toàn hệ thống (Tin tức Tổng hợp) - [ĐÃ TRIỂN KHAI HOÀN THÀNH]

Để hoàn thiện widget **"Tin tức mới nhất"** ở Sidebar trang chi tiết và chuẩn bị cho trang **Tin tức tổng hợp (tìm kiếm, sắp xếp, lọc)** sắp tới, Front-End cần một API lấy danh sách bài viết mới nhất trên toàn trang (không phân biệt danh mục/category).

---

## 1. Vấn đề Hiện tại

- Hiện tại, widget "Tin tức mới nhất" ở Front-End đang phải gọi API lọc theo category `"tin-tuc-va-su-kien"`:
  `GET /api/v1/categories/tin-tuc-va-su-kien/articles`
- Việc này dẫn đến việc **bỏ sót** các bài viết mới xuất bản thuộc các danh mục khác như: *Thông báo, Tuyển sinh, Nghiên cứu khoa học, Sinh viên...* khiến widget không hiển thị đúng nghĩa là "Tin mới nhất toàn hệ thống".

---

## 2. Đặc tả API Yêu cầu từ Backend

Kính đề nghị team Backend phát triển hoặc cung cấp endpoint lấy toàn bộ bài viết đã xuất bản như sau:

- **Endpoint đề xuất**: `GET /api/v1/articles` (hoặc `GET /api/v1/articles/portal`)
- **Method**: `GET`
- **Authentication**: Không yêu cầu (Public API).
- **Tham số truy vấn (Query Parameters)**:
  - `page` (int, default: `1`): Chỉ số trang.
  - `page_size` (int, default: `10`): Số lượng bài viết trên mỗi trang.
  - `sort_by` (string, default: `published_at`): Trường sắp xếp (mặc định là ngày xuất bản).
  - `order` (string, default: `desc`): Thứ tự sắp xếp (mặc định là giảm dần - mới nhất lên đầu).
  - `search` (string, optional): Từ khóa tìm kiếm theo tiêu đề/nội dung bài viết (phục vụ trang tìm kiếm sắp tới).
  - `category_slug` (string, optional): Lọc theo chuyên mục nếu cần.

- **Cấu trúc Dữ liệu Trả về mong muốn (Pagination Response)**:
  ```json
  {
    "items": [
      {
        "id": "uuid",
        "title": "Tiêu đề bài viết thuộc danh mục bất kỳ",
        "slug": "tieu-de-bai-viet-slug",
        "excerpt": "Tóm tắt ngắn...",
        "thumbnail_object_key": "http://localhost:9000/university-media/files/thumb.png",
        "published_at": "2026-06-30T12:00:00Z",
        "category": {
          "id": "uuid",
          "name": "Tuyển sinh",
          "slug": "tuyen-sinh"
        },
        "tags": [
          {
            "id": "uuid",
            "name": "Tuyển sinh 2026",
            "slug": "tuyen-sinh-2026"
          }
        ],
        "author": {
          "id": "uuid",
          "username": "admin",
          "full_name": "Quản trị viên"
        }
      }
    ],
    "page": 1,
    "page_size": 10,
    "total_items": 120,
    "total_pages": 12,
    "has_next": true,
    "has_previous": false
  }
  ```

---

## 3. Bổ sung trường Tags (Nhãn bài viết) - [ĐÃ HỖ TRỢ SẴN]

Bên cạnh **Category (Chuyên mục)**, để hỗ trợ tốt nhất cho việc phân loại sâu và tối ưu hóa SEO (Tag Pages, tìm kiếm bài viết theo Tag):
- **Trạng thái:** Backend **đã hỗ trợ và trả về đầy đủ mảng `tags`** trong cả 3 API Portal quan trọng:
  1. API lấy tin theo chuyên mục: `GET /api/v1/categories/{category_slug}/articles`
  2. API lấy tin mới nhất toàn trang: `GET /api/v1/articles/portal`
  3. API lấy chi tiết bài viết: `GET /api/v1/articles/portal/{slug}`
- **Lưu ý:** Trước đó mảng `tags` trả về rỗng (`[]`) do cơ sở dữ liệu chưa được liên kết/gán tag nào cho các bài viết. Hiện tại đã có dữ liệu tag mẫu để kiểm thử.

---

## 4. Lợi ích khi có API và cấu trúc này

1. **Tin tức mới nhất chuẩn xác**: Giúp hiển thị dòng tin tức cập nhật theo thời gian thực trên toàn website (bất kể là tin sự kiện, thông báo khẩn, hay tin tuyển sinh mới).
2. **Nền tảng cho trang tìm kiếm**: Front-End dễ dàng xây dựng giao diện tìm kiếm tập trung, hỗ trợ phân trang, lọc theo chuyên mục/tag và sắp xếp theo ngày đăng một cách chuyên nghiệp.

---

*Tài liệu này được biên soạn phục vụ việc phối hợp phát triển Portal VinhUni.*
