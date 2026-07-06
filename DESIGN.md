---
name: SET VinhUni Admission Portal
description: Cổng tuyển sinh chính thống, rõ ràng và dễ định hướng cho thí sinh cùng phụ huynh.
colors:
  action-orange: "#b7410e"
  action-orange-hover: "#8b2f08"
  trust-blue: "#1b4965"
  support-amber: "#f4a261"
  canvas: "#ffffff"
  ink: "#171717"
  text-secondary: "#64748b"
  surface-subtle: "#f8fafc"
  border: "#e5e7eb"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "8px"
  lg: "10px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.action-orange}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.action-orange-hover}"
    textColor: "{colors.canvas}"
  button-secondary:
    backgroundColor: "{colors.trust-blue}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: "44px"
  input:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 12px"
    height: "44px"
  content-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: SET VinhUni Admission Portal

## Overview

**Creative North Star: "Cổng chỉ dẫn tuyển sinh"**

Hệ thống thiết kế hoạt động như một người hướng dẫn đáng tin cậy trong hành
trình chọn ngành và đăng ký tuyển sinh. Bố cục ưu tiên đường đọc rõ, hành động
dễ nhận biết và thông tin chính thống; hình ảnh thật của trường mang phần lớn
cảm xúc thay vì hiệu ứng trang trí.

Đây là một hệ thống sáng, gọn và có mật độ vừa phải. Nó chủ động loại bỏ giao
diện AI đại trà với gradient tím, glassmorphism trang trí, card dashboard giả,
chuyển động vô nghĩa, chữ quá nhỏ và các nhóm nội dung lặp lại thiếu phân cấp.

**Key Characteristics:**

- Chính thống nhưng không nặng nề.
- Mobile-first cho hành trình tuyển sinh.
- Cam cho hành động, xanh cho niềm tin và định hướng.
- Typography cùng khoảng trắng tạo phân cấp trước border và shadow.
- Hình ảnh thật và nội dung thật luôn được ưu tiên.

## Colors

Hệ màu kế thừa logo hiện tại và được giới hạn thành các vai trò rõ ràng.

### Primary

- **Cam hành động:** dùng cho CTA tuyển sinh, trạng thái active và focus quan
  trọng.
- **Cam hành động đậm:** chỉ dùng cho hover hoặc active của CTA chính.

### Secondary

- **Xanh tin cậy:** dùng cho điều hướng, tiêu đề hỗ trợ và các hành động cấp hai.

### Tertiary

- **Hổ phách hỗ trợ:** dùng tiết chế cho thông tin cần chú ý, không cạnh tranh
  với CTA chính.

### Neutral

- **Canvas sáng:** nền trang và nền nội dung chính.
- **Mực đậm:** văn bản chính và tiêu đề.
- **Chữ thứ cấp:** metadata và nội dung hỗ trợ khi vẫn đạt WCAG AA.
- **Bề mặt nhẹ:** nền phân nhóm, skeleton và khu vực phụ.
- **Đường biên:** chia tách cấu trúc khi khoảng trắng chưa đủ.

**The Color Role Rule.** Cam biểu thị hành động, xanh biểu thị niềm tin hoặc
định hướng. Không dùng hai màu như đồ trang trí tùy ý.

## Typography

**Display Font:** Inter với system-ui fallback  
**Body Font:** Inter với system-ui fallback

**Character:** Một sans-serif rõ ràng, quen thuộc và hỗ trợ tiếng Việt tốt. Hệ
thống dùng thay đổi kích thước, trọng lượng và khoảng trắng để tạo phân cấp thay
vì trộn nhiều font.

### Hierarchy

- **Display:** đậm, fluid và giới hạn tối đa 4.5rem; chỉ dùng cho thông điệp
  tuyển sinh quan trọng.
- **Headline:** đậm, cân bằng dòng; dùng cho tiêu đề trang và tiêu đề section.
- **Title:** semibold; dùng cho bài viết, ngành học và nhóm nội dung.
- **Body:** 1rem với line-height 1.65; giới hạn độ dài đọc ở 65-75ch.
- **Label:** 0.875rem semibold; dùng cho nút, tab và metadata quan trọng.

**The Readability Rule.** Không dùng chữ nội dung dưới 1rem và không dùng nhãn
dưới 0.875rem trên mobile.

## Elevation

Hệ thống phẳng theo mặc định. Khoảng trắng, nền phân lớp và đường biên nhẹ tạo
chiều sâu; shadow chỉ xuất hiện khi một bề mặt thực sự nổi lên như dropdown,
sticky header hoặc hover của nội dung có thể nhấn.

### Shadow Vocabulary

- **Low:** `0 1px 3px rgba(0, 0, 0, 0.06)` cho control hoặc bề mặt nổi nhẹ.
- **Medium:** `0 4px 8px rgba(0, 0, 0, 0.08)` cho dropdown và sticky header.
- **High:** `0 12px 24px rgba(27, 73, 101, 0.12)` cho modal hoặc overlay.

**The Flat-by-Default Rule.** Không ghép border với shadow mờ lớn chỉ để làm card
trông có vẻ được thiết kế.

## Components

### Buttons

- **Shape:** bo cong rõ nhưng gọn, 8px.
- **Primary:** nền cam hành động, chữ trắng, cao tối thiểu 44px.
- **Hover / Focus:** chuyển sang cam đậm; focus ring tương phản và không bị xóa.
- **Secondary:** nền xanh tin cậy hoặc outline xanh tùy cấp độ.
- **Active:** dịch chuyển tối đa 1px để phản hồi thao tác.

### Chips

- **Style:** nền trung tính hoặc màu thương hiệu ở độ tương phản nhẹ, không viết
  hoa toàn bộ nếu nội dung dài.
- **State:** selected có nền và viền rõ; unselected vẫn có hit area 44px.

### Cards / Containers

- **Corner Style:** 10px cho bề mặt nội dung.
- **Background:** trắng hoặc bề mặt nhẹ.
- **Shadow Strategy:** phẳng ở trạng thái nghỉ, nâng nhẹ khi hover nếu có link.
- **Border:** tối đa 1px và chỉ dùng khi cần xác định ranh giới.
- **Internal Padding:** 16px mobile, 24px desktop.

### Inputs / Fields

- **Style:** nền trắng, viền trung tính, cao tối thiểu 44px, label luôn nằm ngoài
  input.
- **Focus:** border cam cùng focus ring rõ.
- **Error / Disabled:** có màu, biểu tượng hoặc văn bản; không truyền đạt trạng
  thái chỉ bằng màu.

### Navigation

Desktop dùng một hàng điều hướng cao tối đa 72px. Mobile chuyển thành menu rõ
ràng với nút 44px, trạng thái mở có `aria-expanded`, focus đầy đủ và không dùng
margin âm gây tràn viewport.

### Admission CTA

CTA đăng ký tư vấn hoặc xét tuyển phải giữ cùng một tên hành động xuyên suốt,
luôn hiển thị rõ trên mobile và không cạnh tranh với quá một hành động cấp hai.

## Do's and Don'ts

### Do:

- **Do** giữ nguyên logo cùng hệ màu cam-xanh của trường.
- **Do** ưu tiên thí sinh và phụ huynh trong thứ tự thông tin.
- **Do** dùng khoảng trắng, typography và hình ảnh thật để tạo phân cấp.
- **Do** bảo đảm WCAG 2.1 AA, focus rõ và touch target tối thiểu 44 x 44px.
- **Do** tôn trọng `prefers-reduced-motion` cho mọi chuyển động.

### Don't:

- **Don't** dùng gradient tím, glassmorphism trang trí hoặc card dashboard giả.
- **Don't** dùng hiệu ứng chuyển động vô nghĩa, bounce hoặc entrance lặp lại.
- **Don't** dùng chữ quá nhỏ, nhãn viết hoa lặp lại hoặc tracking rộng cho nội
  dung dài.
- **Don't** dùng border trái lớn hơn 1px như một sọc màu trang trí.
- **Don't** lồng card trong card hoặc ghép border với shadow lớn ở trạng thái
  nghỉ.
- **Don't** thay đổi route, API, props, model, validation hoặc luồng dữ liệu để
  đạt mục tiêu thẩm mỹ.
