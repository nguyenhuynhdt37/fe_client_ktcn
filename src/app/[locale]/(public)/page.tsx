// src/app/[locale]/(public)/page.tsx
import { setRequestLocale } from "next-intl/server";
import { HomeHeroWidget, BannerPosition, bannerService } from "@/features/banner";
import { ServicesBar } from "@/features/menu";
import { AdmissionSection, AdmissionConsultationForm } from "@/features/admission";
import { 
  RecruitmentWidget, 
  ArticleHeroSection, 
  articleService, 
  mapPortalArticleToFE, 
  getLocalizedField, 
  formatDate, 
  ArticleTabbedSection
} from "@/features/article";
import { FacultiesSlider } from "@/features/department";

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
  const excludeSlugs = [
    "lich-tuan",
    "weekly-calendar",
    "gioi-thieu",
    "lich-su-phat-trien",
    "chuc-nang-nhiem-vu"
  ];
  const heroArticlesPromise = articleService.getLatestArticles({ pageSize: 8, excludeCategorySlugs: excludeSlugs });
  const popularArticlesPromise = articleService.getLatestArticles({ pageSize: 6, sortBy: "view_count", sortDir: "desc", excludeCategorySlugs: excludeSlugs });
  const newsArticlesPromise = articleService.getArticlesByCategory("tin-tuc-va-su-kien", 1, 10);
  const noticePromise = articleService.getArticlesByCategory("thong-bao", 1, 4);
  const admissionPromise = articleService.getArticlesByCategory("tuyen-sinh", 1, 3);
  const studentPromise = articleService.getArticlesByCategory("sinh-vien", 1, 4);
  const recruitmentPromise = articleService.getArticlesByCategory("tuyen-dung", 1, 4);
  const researchPromise = articleService.getArticlesByCategory("nghien-cuu-khoa-hoc", 1, 7);

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
    researchData
  ] = await Promise.all([
    heroBannersPromise,
    heroArticlesPromise,
    popularArticlesPromise,
    newsArticlesPromise,
    noticePromise,
    admissionPromise,
    studentPromise,
    recruitmentPromise,
    researchPromise
  ]);

  // Sử dụng dữ liệu từ API heroArticles
  const heroArticles = heroArticlesData?.items || [];
  const popularArticles = popularArticlesData?.items || [];

  // Lọc loại trừ tin tức đã hiển thị ở Hero Section
  const heroIds = new Set(heroArticles.map(a => a.id));
  const rawNewsArticles = newsArticlesData?.items || [];
  const displayedNewsArticlesRaw = rawNewsArticles.filter(a => !heroIds.has(a.id)).slice(0, 3);

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

  const newsCategorySlug = finalNewsArticlesRaw[0]?.category?.slug || "";
  const admissionCategorySlug = admissionData?.items?.[0]?.category?.slug || "tuyen-sinh";
  const studentCategorySlug = studentData?.items?.[0]?.category?.slug || "sinh-vien";
  const recruitmentCategorySlug = recruitmentData?.items?.[0]?.category?.slug || "tuyen-dung";
  const researchCategorySlug = researchData?.items?.[0]?.category?.slug || "nghien-cuu-khoa-hoc";

  return (
    <>
      {/* 1. Hero Slider + Bảng thông báo */}
      <HomeHeroWidget banners={heroBanners} notices={noticeList} locale={locale} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      {/* 3. Khoa đào tạo */}
      <FacultiesSlider />

      <main className="w-full">
        {/* 4. Tin tức & Sự kiện nổi bật */}
        <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
          <div className="max-w-[1360px] mx-auto px-6">
            <ArticleHeroSection
              heroArticles={heroArticles}
              popularArticles={popularArticles}
            />
          </div>
        </section>

        {/* 5. Tabs Tin tức / NCKH / Sinh viên */}
        <ArticleTabbedSection
          newsArticles={newsArticles}
          newsCategorySlug={newsCategorySlug}
          researchArticles={researchArticles}
          researchCategorySlug={researchCategorySlug}
          studentList={studentList}
          studentCategorySlug={studentCategorySlug}
        />

        {/* 6. Tuyển sinh + Tuyển dụng */}
        <section className="py-14 md:py-20 bg-slate-50/60 border-y border-slate-100/60">
          <div className="max-w-[1360px] mx-auto px-6 space-y-8">
            <AdmissionSection initialArticles={admissionList} categorySlug={admissionCategorySlug} />
            <RecruitmentWidget items={recruitmentList} categorySlug={recruitmentCategorySlug} />
          </div>
        </section>
      </main>

      {/* 7. Biểu mẫu đăng ký tư vấn tuyển sinh và định hướng nghề nghiệp */}
      <AdmissionConsultationForm />
    </>
  );
}
