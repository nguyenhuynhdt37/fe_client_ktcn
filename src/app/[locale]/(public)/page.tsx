// src/app/[locale]/(public)/page.tsx
import { setRequestLocale } from "next-intl/server";
import { HeroSlider } from "@/features/banner/components/hero-slider";
import { ServicesBar } from "@/features/menu/components/services-bar";
import { NewsSection } from "@/features/article/components/news-grid";
import { NoticeSection } from "@/features/notification/components/notice-list";
import { AdmissionSection } from "@/features/admission/components/admission-tabs";
import { RecruitmentWidget } from "@/features/article/components/recruitment-widget";
import { ResearchSection } from "@/features/research/components/research-section";
import { FacultiesSlider } from "@/features/department/components/faculties-slider";
import { StudentActivities } from "@/features/student/components/student-activities";
import { GallerySlider } from "@/features/media/components/gallery-slider";

// Import APIs và Helpers
import { getBannersServer } from "@/features/banner/api/get-banners-server";
import { BannerPosition } from "@/features/banner/types";
import { getArticlesByCategoryServer } from "@/features/article/api/get-articles-server";
import { mapPortalArticleToFE, getLocalizedField, formatDate } from "@/features/article/utils/map-article";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  // Cấu hình static rendering locale
  setRequestLocale(locale);

  // 1. Fetch Banner Slider
  const heroBannersPromise = getBannersServer(BannerPosition.HOME_HERO);

  // 2. Fetch các danh mục bài viết song song để tối ưu tốc độ tải trang
  const newsPromise = getArticlesByCategoryServer("tin-tuc-va-su-kien", 1, 3); // Lấy 3 tin tức
  const noticePromise = getArticlesByCategoryServer("thong-bao", 1, 4);        // Lấy 4 thông báo
  const admissionPromise = getArticlesByCategoryServer("tuyen-sinh", 1, 3);    // Lấy 3 bài tuyển sinh
  const studentPromise = getArticlesByCategoryServer("sinh-vien", 1, 4);        // Lấy 4 bài sinh viên
  const recruitmentPromise = getArticlesByCategoryServer("tuyen-dung", 1, 4);    // Lấy 4 bài tuyển dụng
  const researchPromise = getArticlesByCategoryServer("nckh-va-doi-ngoai", 1, 3); // Lấy 3 bài nghiên cứu khoa học

  // Chờ tất cả API hoàn thành cùng lúc
  const [
    heroBanners,
    newsData,
    noticeData,
    admissionData,
    studentData,
    recruitmentData,
    initialResearchData
  ] = await Promise.all([
    heroBannersPromise,
    newsPromise,
    noticePromise,
    admissionPromise,
    studentPromise,
    recruitmentPromise,
    researchPromise
  ]);

  // Nếu "nckh-va-doi-ngoai" bị null hoặc trống, thử fetch "nckh"
  let researchData = initialResearchData;
  if (!researchData || !researchData.items || researchData.items.length === 0) {
    researchData = await getArticlesByCategoryServer("nckh", 1, 3);
  }

  // Ánh xạ dữ liệu cho component FE với hỗ trợ i18n
  const newsArticles = newsData?.items.map(item => mapPortalArticleToFE(item, locale)) || [];
  
  const noticeList = noticeData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    date: formatDate(item.published_at, locale),
    href: `/${locale}/tin-tuc/${item.slug}`
  })) || [];

  const admissionList = admissionData?.items.map(item => mapPortalArticleToFE(item, locale)) || [];
  const studentList = studentData?.items.map(item => mapPortalArticleToFE(item, locale)) || [];
  
  const recruitmentList = recruitmentData?.items.map(item => ({
    id: item.id,
    title: getLocalizedField<string>(item, "title", locale),
    date: formatDate(item.published_at, locale),
    href: `/${locale}/tin-tuc/${item.slug}`
  })) || [];

  const researchArticles = researchData?.items.map(item => mapPortalArticleToFE(item, locale)) || [];

  return (
    <>
      {/* 1. Slide giới thiệu */}
      <HeroSlider banners={heroBanners} />

      {/* 2. Dịch vụ nhanh */}
      <ServicesBar />

      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {/* 3. Phân hệ Tin tức & Thông báo động */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <NewsSection articles={newsArticles} />
          </div>
          <div className="lg:col-span-3">
            <NoticeSection notices={noticeList} />
          </div>
        </div>

        {/* 4. Phân hệ Tuyển sinh & Tuyển dụng */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-9">
            <AdmissionSection initialArticles={admissionList} />
          </div>
          <div className="lg:col-span-3">
            <RecruitmentWidget items={recruitmentList} />
          </div>
        </div>

        {/* 5. Phân hệ Nghiên cứu khoa học */}
        <div className="pt-4">
          <ResearchSection articles={researchArticles} />
        </div>
      </main>

      {/* 6. Khoa đào tạo slider */}
      <FacultiesSlider />

      {/* 7. Hoạt động sinh viên động từ Backend */}
      <StudentActivities activities={studentList} />

      {/* 8. Hình ảnh tiêu biểu */}
      <GallerySlider />
    </>
  );
}
