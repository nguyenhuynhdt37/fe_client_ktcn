export function getArticleImageUrl(thumbnail: string | null | undefined): string {
  if (!thumbnail) return "/images/no-image-dhv.jpg";
  if (thumbnail.startsWith("http://") || thumbnail.startsWith("https://")) {
    return thumbnail;
  }
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  return `${apiBaseUrl}/api/v1/media/public/${thumbnail}`;
}
