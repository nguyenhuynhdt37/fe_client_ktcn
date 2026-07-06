// src/app/[locale]/(public)/page.tsx
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { HeroSlider, BannerPosition, bannerService } from "@/features/banner";
import { ServicesBar } from "@/features/menu";
import { NoticeSection, MarqueeNotice } from "@/features/notification";
import { LeaderSlider, lecturerService } from "@/features/lecturer";
import { AdmissionSection, AdmissionConsultationForm } from "@/features/admission";
import {
  RecruitmentWidget,
  ArticleHeroSection,
  articleService,
  mapPortalArticleToFE,
  getLocalizedField,
  formatDate,
  getArticleImageUrl,
  NewsSection,
} from "@/features/article";
import { FacultiesSlider } from "@/features/department";
import { StudentActivities } from "@/features/student";
import { GallerySlider } from "@/features/media";
import { ConsultationCallout } from "@/features/consultation";
import { ResearchSection } from "@/features/research/components/ResearchSection";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Cấu hình static rendering locale
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: "common" });

  // 1. Fetch Banner Slider
  const heroBannersPromise = bannerService.getBanners(BannerPosition.HOME_HERO);

  // 2. Fetch các danh mục bài viết song song để tối ưu tốc độ tải trang
  const excludeSlugs = [
    "lich-tuan",
    "weekly-calendar",
    "gioi-thieu",
    "lich-su-phat-trien",
    "chuc-nang-nhiem-vu",
  ];
  const heroArticlesPromise = articleService.getLatestArticles({
    pageSize: 8,
    excludeCategorySlugs: excludeSlugs,
  });
  const popularArticlesPromise = articleService.getLatestArticles({
    pageSize: 6,
    sortBy: "view_count",
    sortDir: "desc",
    excludeCategorySlugs: excludeSlugs,
  });
  const newsArticlesPromise = articleService.getArticlesByCategory("tin-tuc-va-su-kien", 1, 10); // Lấy 10 tin tức - sự kiện để loại trừ trùng lặp
  const noticePromise = articleService.getArticlesByCategory("thong-bao", 1, 4); // Lấy 4 thông báo
  const admissionPromise = articleService.getArticlesByCategory("tuyen-sinh", 1, 3); // Lấy 3 bài tuyển sinh (Grid 3 cột)
  const studentPromise = articleService.getArticlesByCategory("sinh-vien", 1, 4); // Lấy 4 bài sinh viên
  const recruitmentPromise = articleService.getArticlesByCategory("tuyen-dung", 1, 4); // Lấy 4 bài tuyển dụng
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
    staffsData,
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
    staffsPromise,
  ]);

  // Sử dụng dữ liệu từ API heroArticles
  const heroArticles = heroArticlesData?.items || [];
  const popularArticles = popularArticlesData?.items || [];

  // Dữ liệu chạy chữ nóng (Marquee) lấy từ 5 tin tức nổi bật đầu tiên của heroArticles
  const marqueeNotices = heroArticles.slice(0, 5).map((item) => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    href: `/tin-tuc/${item.slug}`,
  }));

  // Lọc loại trừ tin tức đã hiển thị ở Hero Section để hiển thị ở khối Tin tức - Sự kiện Grid 3 card phía dưới
  const heroIds = new Set(heroArticles.map((a) => a.id));
  const rawNewsArticles = newsArticlesData?.items || [];
  const displayedNewsArticlesRaw = rawNewsArticles.filter((a) => !heroIds.has(a.id)).slice(0, 3);

  let finalNewsArticlesRaw = displayedNewsArticlesRaw;
  if (finalNewsArticlesRaw.length < 3 && rawNewsArticles.length > 0) {
    finalNewsArticlesRaw = rawNewsArticles.slice(0, 3);
  }
  const newsArticles = finalNewsArticlesRaw.map((item) => mapPortalArticleToFE(item, locale));

  const noticeList =
    noticeData?.items.map((item) => ({
      id: item.id,
      title: getLocalizedField<string>(item, "title", locale),
      date: formatDate(item.published_at, locale),
      href: `/tin-tuc/${item.slug}`,
    })) || [];

  const admissionList =
    admissionData?.items.map((item) => ({
      id: item.id,
      title: getLocalizedField<string>(item, "title", locale),
      excerpt: getLocalizedField<string>(item, "excerpt", locale),
      imageUrl: item.thumbnail_object_key || "/images/no-image-dhv.jpg",
      category: item.category ? getLocalizedField<string>(item.category, "name", locale) : "",
      categoryHref: `/tin-tuc?category_slug=${item.category?.slug || ""}`,
      date: formatDate(item.published_at, locale),
      href: `/tin-tuc/${item.slug}`,
      isPinned: item.is_pinned,
    })) || [];

  const studentList = studentData?.items.map((item) => mapPortalArticleToFE(item, locale)) || [];

  const recruitmentList =
    recruitmentData?.items.map((item) => ({
      id: item.id,
      title: getLocalizedField<string>(item, "title", locale),
      date: formatDate(item.published_at, locale),
      href: `/tin-tuc/${item.slug}`,
    })) || [];

  const researchArticles =
    researchData?.items.map((item) => ({
      id: item.id,
      title: getLocalizedField<string>(item, "title", locale),
      excerpt: getLocalizedField<string>(item, "excerpt", locale),
      imageUrl: item.thumbnail_object_key || "/images/no-image-dhv.jpg",
      category: item.category ? getLocalizedField<string>(item.category, "name", locale) : "",
      categoryHref: `/tin-tuc?category_slug=${item.category?.slug || ""}`,
      date: formatDate(item.published_at, locale),
      href: `/tin-tuc/${item.slug}`,
      isPinned: item.is_pinned,
    })) || [];

  const newsCategorySlug = finalNewsArticlesRaw[0]?.category?.slug || "";
  const admissionCategorySlug = admissionData?.items?.[0]?.category?.slug || "tuyen-sinh";
  const studentCategorySlug = studentData?.items?.[0]?.category?.slug || "sinh-vien";
  const recruitmentCategorySlug = recruitmentData?.items?.[0]?.category?.slug || "tuyen-dung";
  const researchCategorySlug = researchData?.items?.[0]?.category?.slug || "nghien-cuu-khoa-hoc";

  // Map danh sách ban lãnh đạo nhận từ API sang cấu trúc hiển thị của FE
  const dynamicLeaders =
    staffsData?.map((item) => {
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
        biographyHtml: item.biography || undefined,
      };
    }) || [];

  const noticeCategorySlug = noticeData?.items?.[0]?.category?.slug || "thong-bao";

  return (
    <>
      {/* 1. Hero Slider (Chỉ chứa ảnh banner) */}
      <HeroSlider banners={heroBanners} />

      {/* Chữ chạy tin nóng (Marquee) */}
      <MarqueeNotice notices={marqueeNotices} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <ConsultationCallout />

      <main className="w-full">
        {/* 2.5 Khối Hero Tin tức & Sự kiện nổi bật phong cách doanthanhnien.vn */}
        <section className="site-container section-shell">
          <ArticleHeroSection heroArticles={heroArticles} popularArticles={popularArticles} />
        </section>

        {/* 3. Phân hệ Tin tức & Thông báo động */}
        <section className="border-border-subtle bg-section-alt border-y">
          <div className="site-container section-shell">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-9">
                <NewsSection articles={newsArticles} categorySlug={newsCategorySlug} />
              </div>
              <div className="lg:col-span-3">
                <NoticeSection notices={noticeList} categorySlug={noticeCategorySlug} />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Phân hệ Tuyển sinh & Tuyển dụng */}
        <section className="site-container section-shell">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-9">
              <AdmissionSection
                initialArticles={admissionList}
                categorySlug={admissionCategorySlug}
              />
            </div>
            <div className="lg:col-span-3">
              <RecruitmentWidget items={recruitmentList} categorySlug={recruitmentCategorySlug} />
            </div>
          </div>
        </section>

        {/* 5. Phân hệ Nghiên cứu khoa học */}
        <section className="border-border-subtle bg-section-alt border-y">
          <div className="site-container section-shell">
            <ResearchSection articles={researchArticles} categorySlug={researchCategorySlug} />
          </div>
        </section>

        {/* 6. Ban lãnh đạo */}
        <section className="site-container section-shell">
          <div className="space-y-6">
            <h2 className="section-heading">{tCommon("leadership_title")}</h2>
            <LeaderSlider leaders={dynamicLeaders} />
          </div>
        </section>

        {/* 7. Phân hệ Khoa đào tạo & Đối tác */}
        <section className="border-border-subtle bg-section-alt border-y">
          <div className="site-container section-shell">
            <FacultiesSlider />
          </div>
        </section>

        {/* 8. Hoạt động sinh viên */}
        <section className="site-container section-shell">
          <StudentActivities activities={studentList} categorySlug={studentCategorySlug} />
        </section>

        {/* 9. Thư viện ảnh (Gallery) */}
        <section className="border-border-subtle bg-section-alt border-y">
          <div className="site-container section-shell">
            <GallerySlider />
          </div>
        </section>
      </main>

      {/* 10. Biểu mẫu đăng ký tư vấn tuyển sinh và định hướng nghề nghiệp (từ main) */}
      <AdmissionConsultationForm />
    </>
  );
}
