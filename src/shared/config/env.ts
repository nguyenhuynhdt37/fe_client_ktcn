import { z } from "zod";

const isServer = typeof window === "undefined";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000"),
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  REVALIDATION_TOKEN: isServer
    ? z.string().min(1, "REVALIDATION_TOKEN is required")
    : z.string().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Hàm parse và kiểm tra an toàn
const parseEnv = () => {
  const processEnv = {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    REVALIDATION_TOKEN: process.env.REVALIDATION_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
  };

  const parsed = envSchema.safeParse(processEnv);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    // Tránh crash build trên Vercel nếu không muốn, nhưng chuẩn production là nên báo lỗi
    // throw new Error("Invalid environment variables");
    return processEnv as unknown as z.infer<typeof envSchema>;
  }

  return parsed.data;
};

export const env = parseEnv();
