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
  if (!program) return {};
  return constructMetadata({
    title: program.name,
    description:
      program.short_description ??
      (locale === "en"
        ? `Undergraduate programme in ${program.name}.`
        : `Chương trình đào tạo đại học ngành ${program.name}.`),
    slug: `dao-tao/dai-hoc/${slug}`,
    locale,
    type: "website",
  });
}

export default async function UndergraduateProgramPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const program = await programService.getDetail(slug, locale);
  if (!program) notFound();
  return <ProgramRecord program={program} locale={locale} />;
}
