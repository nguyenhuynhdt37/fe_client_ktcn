// src/app/[locale]/(public)/page.tsx
import { setRequestLocale } from "next-intl/server";
import { HeroSlider, BannerPosition, bannerService } from "@/features/banner";
import { ServicesBar } from "@/features/menu";
import { NoticeSection, MarqueeNotice } from "@/features/notification";
import { LeaderSlider, lecturerService } from "@/features/lecturer";
import { AdmissionSection } from "@/features/admission";
import { 
  RecruitmentWidget, 
  ArticleHeroSection, 
  articleService, 
  mapPortalArticleToFE, 
  getLocalizedField, 
  formatDate, 
  getArticleImageUrl,
  NewsSection
} from "@/features/article";
import { ResearchSection } from "@/features/research";
import { FacultiesSlider } from "@/features/department";
import { StudentActivities } from "@/features/student";
import { GallerySlider } from "@/features/media";

// Import APIs và Helpers



interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Cấu hình static rendering locale
  setRequestLocale(locale);

  // 1. Fetch Banner Slider
  const heroBannersPromise = bannerService.getBanners(BannerPosition.HOME_HERO);

  // 2. Fetch các danh mục bài viết song song để tối ưu tốc độ tải trang
  // Loại trừ cả slug tiếng Việt ("lich-tuan") và tiếng Anh ("weekly-calendar") cùng các danh mục giới thiệu tĩnh
  const excludeSlugs = [
    "lich-tuan",
    "weekly-calendar",
    "gioi-thieu",
    "lich-su-phat-trien",
    "chuc-nang-nhiem-vu"
  ];
  const heroArticlesPromise = articleService.getLatestArticles({ pageSize: 8, excludeCategorySlugs: excludeSlugs });
  const popularArticlesPromise = articleService.getLatestArticles({ pageSize: 6, sortBy: "view_count", sortDir: "desc", excludeCategorySlugs: excludeSlugs });
  const newsArticlesPromise = articleService.getArticlesByCategory("tin-tuc-va-su-kien", 1, 10); // Lấy 10 tin tức - sự kiện để loại trừ trùng lặp
  const noticePromise = articleService.getArticlesByCategory("thong-bao", 1, 4);        // Lấy 4 thông báo
  const admissionPromise = articleService.getArticlesByCategory("tuyen-sinh", 1, 3);    // Lấy 3 bài tuyển sinh (Grid 3 cột)
  const studentPromise = articleService.getArticlesByCategory("sinh-vien", 1, 4);        // Lấy 4 bài sinh viên
  const recruitmentPromise = articleService.getArticlesByCategory("tuyen-dung", 1, 4);    // Lấy 4 bài tuyển dụng
  const researchPromise = articleService.getArticlesByCategory("nghien-cuu-khoa-hoc", 1, 7); // Lấy 7 bài nghiên cứu (1 lớn, 6 phụ)
  const staffsPromise = lecturerService.getStaffs({ lang: locale });

  // Chờ tất cả API hoàn thành cùng lúc
  const [
    heroBanners,
    heroArticlesData,
    popularArticlesData,
    newsArticlesData,
    noticeData,
    admissionData,
    studentData,
    recruitmentData,
    researchData,
    staffsData
  ] = await Promise.all([
    heroBannersPromise,
    heroArticlesPromise,
    popularArticlesPromise,
    newsArticlesPromise,
    noticePromise,
    admissionPromise,
    studentPromise,
    recruitmentPromise,
    researchPromise,
    staffsPromise
  ]);

  // Sử dụng dữ liệu từ API heroArticles
  const heroArticles = heroArticlesData?.items || [];
  const popularArticles = popularArticlesData?.items || [];

  // Dữ liệu chạy chữ nóng (Marquee) lấy từ 5 tin tức nổi bật đầu tiên của heroArticles
  const marqueeNotices = heroArticles.slice(0, 5).map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    href: `/tin-tuc/${item.slug}`
  }));

  // Lọc loại trừ tin tức đã hiển thị ở Hero Section để hiển thị ở khối Tin tức - Sự kiện Grid 3 card phía dưới
  const heroIds = new Set(heroArticles.map(a => a.id));
  const rawNewsArticles = newsArticlesData?.items || [];
  const displayedNewsArticlesRaw = rawNewsArticles.filter(a => !heroIds.has(a.id)).slice(0, 3);

  // Fallback: nếu lọc xong không đủ 3 bài, lấy từ danh sách ban đầu để luôn có đủ bài hiển thị
  let finalNewsArticlesRaw = displayedNewsArticlesRaw;
  if (finalNewsArticlesRaw.length < 3 && rawNewsArticles.length > 0) {
    finalNewsArticlesRaw = rawNewsArticles.slice(0, 3);
  }
  const newsArticles = finalNewsArticlesRaw.map(item => mapPortalArticleToFE(item, locale));

  const noticeList = noticeData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    date: formatDate(item.published_at, locale),
    href: `/tin-tuc/${item.slug}`
  })) || [];

  const admissionList = admissionData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    excerpt: getLocalizedField<string>(item, "excerpt", locale),
    imageUrl: item.thumbnail_object_key || "/images/no-image-dhv.jpg",
    category: item.category ? getLocalizedField<string>(item.category, "name", locale) : "",
    categoryHref: `/tin-tuc?category_slug=${item.category?.slug || ""}`,
    date: formatDate(item.published_at, locale),
    href: `/tin-tuc/${item.slug}`,
    isPinned: item.is_pinned
  })) || [];

  const studentList = studentData?.items.map(item => mapPortalArticleToFE(item, locale)) || [];

  const recruitmentList = recruitmentData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    date: formatDate(item.published_at, locale),
    href: `/tin-tuc/${item.slug}`
  })) || [];

  const researchArticles = researchData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    excerpt: getLocalizedField<string>(item, "excerpt", locale),
    imageUrl: item.thumbnail_object_key || "/images/no-image-dhv.jpg",
    category: item.category ? getLocalizedField<string>(item.category, "name", locale) : "",
    categoryHref: `/tin-tuc?category_slug=${item.category?.slug || ""}`,
    date: formatDate(item.published_at, locale),
    href: `/tin-tuc/${item.slug}`,
    isPinned: item.is_pinned
  })) || [];

  // Trích xuất slug danh mục theo ngôn ngữ hiện tại từ API response
  // Dùng slug từ bài viết đầu tiên của mỗi nhóm (slug đã được API dịch theo lang)
  const newsCategorySlug = finalNewsArticlesRaw[0]?.category?.slug || "";
  const noticeCategorySlug = noticeData?.items?.[0]?.category?.slug || "thong-bao";
  const admissionCategorySlug = admissionData?.items?.[0]?.category?.slug || "tuyen-sinh";
  const studentCategorySlug = studentData?.items?.[0]?.category?.slug || "sinh-vien";
  const recruitmentCategorySlug = recruitmentData?.items?.[0]?.category?.slug || "tuyen-dung";
  const researchCategorySlug = researchData?.items?.[0]?.category?.slug || "nghien-cuu-khoa-hoc";

  // Map danh sách ban lãnh đạo nhận từ API sang cấu trúc hiển thị của FE
  const dynamicLeaders = staffsData?.map((item) => {
    let title = "";
    let cleanName = item.full_name;
    const prefixes = ["PGS.TS.", "PGS. TS.", "GS.TS.", "GS. TS.", "TS.", "ThS.", "CN."];
    for (const prefix of prefixes) {
      if (item.full_name.startsWith(prefix)) {
        title = prefix;
        cleanName = item.full_name.substring(prefix.length).trim();
        break;
      }
    }

    return {
      id: item.id,
      name: cleanName,
      title: title,
      role: item.position?.name || item.department?.name || "",
      imageUrl: getArticleImageUrl(item.avatar_object_key),
      email: item.email || undefined,
      website: item.website || undefined,
      googleScholar: undefined,
      biographyHtml: item.biography || undefined
    };
  }) || [];

  return (
    <>
      {/* 2.2 Thanh chạy chữ thông báo khẩn cấp */}
      <MarqueeNotice notices={marqueeNotices} />

      {/* 1. Slide giới thiệu */}
      <HeroSlider banners={heroBanners} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <main className="w-full">
        {/* 2.5 Khối Hero Tin tức & Sự kiện nổi bật phong cách doanthanhnien.vn */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <ArticleHeroSection
            heroArticles={heroArticles}
            popularArticles={popularArticles}
          />
        </section>

        {/* 3. Phân hệ Tin tức & Thông báo động */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-9">
              <NewsSection articles={newsArticles} categorySlug={newsCategorySlug} />
            </div>
            <div className="lg:col-span-3">
              <NoticeSection notices={noticeList} categorySlug={noticeCategorySlug} />
            </div>
          </div>
        </section>

        {/* 4. Phân hệ Tuyển sinh & Tuyển dụng */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-9">
              <AdmissionSection initialArticles={admissionList} categorySlug={admissionCategorySlug} />
            </div>
            <div className="lg:col-span-3">
              <RecruitmentWidget items={recruitmentList} categorySlug={recruitmentCategorySlug} />
            </div>
          </div>
        </section>

        {/* 5. Phân hệ Nghiên cứu khoa học */}
        <section className="py-12 max-w-[1360px] mx-auto px-6">
          <ResearchSection articles={researchArticles} categorySlug={researchCategorySlug} />
        </section>
      </main>

      {/* 6. Khoa đào tạo slider */}
      <FacultiesSlider />

      {/* Ban giám hiệu / Lãnh đạo slider chạy ngang */}
      <LeaderSlider leaders={dynamicLeaders.length > 0 ? dynamicLeaders : undefined} />

      {/* 7. Hoạt động sinh viên động từ Backend */}
      <StudentActivities activities={studentList} categorySlug={studentCategorySlug} />

      {/* 8. Hình ảnh tiêu biểu */}
      <GallerySlider />
    </>
  );
}
