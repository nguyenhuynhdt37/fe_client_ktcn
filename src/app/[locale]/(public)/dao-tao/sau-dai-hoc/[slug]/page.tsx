import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProgramRecord, programService } from "@/features/program";
import { constructMetadata } from "@/shared/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const program = await programService.getDetail(slug, locale);
  if (!program || program.degree_level !== "master") return {};
  const isEn = locale === "en";

  return constructMetadata({
    title: program.name,
    description:
      program.short_description ??
      (isEn
        ? `Postgraduate programme in ${program.name}.`
        : `Chương trình đào tạo sau đại học ${program.name}.`),
    slug: `${isEn ? "academics/postgraduate" : "dao-tao/sau-dai-hoc"}/${slug}`,
    locale,
    type: "website",
  });
}

export default async function PostgraduateProgramPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const program = await programService.getDetail(slug, locale);
  if (!program || program.degree_level !== "master") notFound();
  return <ProgramRecord program={program} locale={locale} />;
}
