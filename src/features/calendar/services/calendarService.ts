import { articleService } from "@/features/article";

export const calendarService = {
  /**
   * Lấy danh sách lịch công tác tuần (các bài viết thuộc danh mục lich-tuan / weekly-calendar)
   */
  async getWeeklyCalendars(page: number, locale: string) {
    const categorySlug = locale === "en" ? "weekly-calendar" : "lich-tuan";
    return await articleService.getLatestArticles({
      page,
      pageSize: 10,
      categorySlug,
    });
  },

  /**
   * Lấy chi tiết lịch công tác tuần theo slug
   */
  async getWeeklyCalendarDetail(slug: string) {
    return await articleService.getArticleDetail(slug);
  },
};
