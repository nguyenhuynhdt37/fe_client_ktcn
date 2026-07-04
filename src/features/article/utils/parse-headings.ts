export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Chuyển đổi chuỗi tiếng Việt có dấu và các ký tự đặc biệt thành dạng slug không dấu
 */
export function slugify(str: string): string {
  if (!str) return "";
  
  let slug = str.toLowerCase();

  // Thay thế ký tự tiếng Việt có dấu
  slug = slug.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  slug = slug.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  slug = slug.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  slug = slug.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  slug = slug.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  slug = slug.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y"); // Hỗ trợ cả y dấu huyền
  slug = slug.replace(/ỳ/g, "y");
  slug = slug.replace(/đ/g, "d");

  // Loại bỏ ký tự đặc biệt, chỉ giữ lại chữ cái, số, khoảng trắng và dấu gạch ngang
  slug = slug.replace(/[^a-z0-9\s-]/g, "");

  // Thay thế nhiều khoảng trắng thành một khoảng trắng và trim
  slug = slug.replace(/\s+/g, " ").trim();

  // Thay thế khoảng trắng thành dấu gạch ngang
  slug = slug.replace(/\s/g, "-");

  // Rút gọn nhiều dấu gạch ngang liên tiếp
  slug = slug.replace(/-+/g, "-");

  // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
  slug = slug.replace(/^-+|-+$/g, "");

  return slug;
}

/**
 * Parse chuỗi HTML nội dung bài viết để trích xuất headings H2 & H3,
 * đồng thời chèn tự động ID neo (anchor link) tương ứng vào thẻ heading.
 */
export function parseHeadings(htmlContent: string): {
  cleanHtml: string;
  headings: HeadingItem[];
} {
  if (!htmlContent) {
    return { cleanHtml: "", headings: [] };
  }

  const headings: HeadingItem[] = [];
  let headingCount = 0;

  // Regex khớp các thẻ h2, h3 và lấy nội dung bên trong của chúng
  // Hỗ trợ thẻ có các thuộc tính class, style khác
  const headingRegex = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;

  const cleanHtml = htmlContent.replace(
    headingRegex,
    (match: string, levelStr: string, attributes: string, content: string) => {
      const level = parseInt(levelStr, 10);
      
      // Loại bỏ các thẻ HTML lồng nhau bên trong heading (như <strong>, <span>, <a>) để lấy text thuần
      const text = content.replace(/<[^>]+>/g, "").trim();
      
      if (!text) {
        return match;
      }

      let baseId = slugify(text);
      if (!baseId) {
        headingCount++;
        baseId = `muc-luc-${headingCount}`;
      }

      // Đảm bảo id duy nhất bằng cách thêm hậu tố nếu bị trùng lặp
      let uniqueId = baseId;
      let suffix = 1;
      while (headings.some((h) => h.id === uniqueId)) {
        uniqueId = `${baseId}-${suffix++}`;
      }

      headings.push({
        id: uniqueId,
        text,
        level,
      });

      // Loại bỏ thuộc tính id cũ nếu có trong attributes để tránh trùng lặp
      const attrsWithoutId = attributes.replace(/\bid\s*=\s*['"][^'"]*['"]/gi, "").trim();
      const spacer = attrsWithoutId ? " " : "";

      return `<h${level} id="${uniqueId}"${spacer}${attrsWithoutId}>${content}</h${level}>`;
    }
  );

  return { cleanHtml, headings };
}
