import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("common");
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-darkred border-t-transparent"></div>
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          {t("loading")}
        </p>
      </div>
    </div>
  );
}
