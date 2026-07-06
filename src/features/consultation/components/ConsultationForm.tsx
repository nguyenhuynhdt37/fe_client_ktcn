"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { consultationService } from "../services/consultationService";
import type {
  ConsultationCreatedResponse,
  ConsultationFormPayload,
} from "../types/consultation.types";

const schema = z.object({
  full_name: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^(?:\+84|0)[0-9\s().-]{8,14}$/, "Số điện thoại chưa đúng định dạng"),
  email: z.string().trim().email("Email chưa đúng định dạng").max(255),
  interested_major: z.string().trim().min(2, "Vui lòng nhập ngành bạn quan tâm").max(255),
  request_type: z.enum([
    "ADMISSION_CONSULTING",
    "CAMPUS_VISIT",
    "RECEIVE_MATERIALS",
    "APPLICATION_REGISTRATION",
  ]),
  message: z.string().trim().max(2000, "Nội dung tối đa 2.000 ký tự").optional(),
  consent_given: z
    .boolean()
    .refine((value) => value, "Bạn cần đồng ý để nhà trường liên hệ tư vấn"),
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof schema>;

const requestTypes = [
  { value: "ADMISSION_CONSULTING", label: "Tư vấn tuyển sinh" },
  { value: "CAMPUS_VISIT", label: "Tham quan trường" },
  { value: "RECEIVE_MATERIALS", label: "Nhận tài liệu tuyển sinh" },
  { value: "APPLICATION_REGISTRATION", label: "Đăng ký xét tuyển" },
] as const;

const majors = [
  "Công nghệ thông tin",
  "Kỹ thuật phần mềm",
  "Trí tuệ nhân tạo",
  "Kỹ thuật điện",
  "Kỹ thuật điện tử - viễn thông",
  "Kỹ thuật điều khiển và tự động hóa",
  "Kỹ thuật xây dựng",
  "Công nghệ kỹ thuật ô tô",
];

function getSubmitError(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const data = error.response.data as {
      error?: { message?: string };
      detail?: string;
    };
    return data.error?.message || data.detail || "Không thể gửi yêu cầu lúc này.";
  }
  return "Không thể gửi yêu cầu lúc này. Vui lòng thử lại sau.";
}

export function ConsultationForm() {
  const [result, setResult] = useState<ConsultationCreatedResponse | null>(null);
  const [submitError, setSubmitError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      interested_major: "",
      request_type: "ADMISSION_CONSULTING",
      message: "",
      consent_given: false,
      website: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitError("");
    try {
      const response = await consultationService.create(values as ConsultationFormPayload);
      setResult(response);
    } catch (error) {
      setSubmitError(getSubmitError(error));
    }
  };

  if (result) {
    return (
      <div
        className="border-border bg-card flex min-h-[30rem] flex-col items-center justify-center rounded-[var(--radius-lg)] border p-7 text-center shadow-[var(--shadow-sm)] sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="bg-success/10 text-success mb-5 inline-flex size-16 items-center justify-center rounded-full">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
          Đã tiếp nhận yêu cầu
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md leading-7">
          Cảm ơn bạn đã quan tâm. Bộ phận tuyển sinh sẽ liên hệ qua số điện thoại đã đăng ký trong
          thời gian sớm nhất.
        </p>
        <div className="border-border bg-section-alt mt-6 rounded-[var(--radius-md)] border px-5 py-4">
          <p className="text-muted-foreground text-sm">Mã yêu cầu của bạn</p>
          <p className="text-brand-blue mt-1 text-lg font-bold tracking-wide">
            {result.reference_code}
          </p>
        </div>
        <Link href="/" className={cn(buttonVariants(), "mt-7")}>
          Về trang chủ
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const inputClassName =
    "border-border bg-background text-foreground placeholder:text-muted-foreground/75 focus:border-brand-blue focus:ring-brand-blue/15 min-h-11 w-full rounded-[var(--radius-md)] border px-3.5 py-2.5 text-base outline-none transition-[border-color,box-shadow] focus:ring-4";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-border bg-card rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-sm)] sm:p-7 lg:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Họ và tên" error={errors.full_name?.message} required>
          <input
            {...register("full_name")}
            className={inputClassName}
            autoComplete="name"
            placeholder="Nguyễn Văn An"
            aria-invalid={Boolean(errors.full_name)}
          />
        </Field>

        <Field label="Số điện thoại" error={errors.phone?.message} required>
          <input
            {...register("phone")}
            className={inputClassName}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="09xx xxx xxx"
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>

        <Field label="Email" error={errors.email?.message} required>
          <input
            {...register("email")}
            className={inputClassName}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ban@example.com"
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label="Ngành quan tâm" error={errors.interested_major?.message} required>
          <input
            {...register("interested_major")}
            className={inputClassName}
            list="admission-majors"
            placeholder="Chọn hoặc nhập tên ngành"
            aria-invalid={Boolean(errors.interested_major)}
          />
          <datalist id="admission-majors">
            {majors.map((major) => (
              <option key={major} value={major} />
            ))}
          </datalist>
        </Field>

        <Field label="Nhu cầu của bạn" error={errors.request_type?.message} required>
          <select
            {...register("request_type")}
            className={inputClassName}
            aria-invalid={Boolean(errors.request_type)}
          >
            {requestTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="consultation-website">Website</label>
          <input
            id="consultation-website"
            {...register("website")}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="sm:col-span-2">
          <Field label="Nội dung cần tư vấn" error={errors.message?.message}>
            <textarea
              {...register("message")}
              className={`${inputClassName} min-h-32 resize-y`}
              placeholder="Bạn đang quan tâm điều gì về ngành học, phương thức xét tuyển hoặc học phí?"
              aria-invalid={Boolean(errors.message)}
            />
          </Field>
        </div>
      </div>

      <div className="mt-5">
        <label className="text-foreground flex cursor-pointer items-start gap-3 text-sm leading-6">
          <input
            {...register("consent_given")}
            type="checkbox"
            className="border-border text-brand-blue focus:ring-brand-blue mt-1 size-4 shrink-0 rounded"
          />
          <span>
            Tôi đồng ý để nhà trường sử dụng thông tin trên nhằm liên hệ và hỗ trợ tư vấn tuyển
            sinh. <span className="text-danger">*</span>
          </span>
        </label>
        {errors.consent_given && (
          <p className="text-danger mt-1.5 text-sm">{errors.consent_given.message}</p>
        )}
      </div>

      {submitError && (
        <div
          className="border-danger/25 bg-danger/5 text-danger mt-5 rounded-[var(--radius-md)] border px-4 py-3 text-sm"
          role="alert"
        >
          {submitError}
        </div>
      )}

      <div className="border-border mt-6 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground flex items-center gap-2 text-sm">
          <ShieldCheck className="text-brand-blue size-4 shrink-0" aria-hidden="true" />
          Thông tin được bảo mật và chỉ dùng để tư vấn.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-44">
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              Đang gửi...
            </>
          ) : (
            <>
              Gửi yêu cầu
              <ArrowRight className="size-4" aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="text-foreground block text-sm font-semibold">
      <span className="mb-2 block">
        {label} {required && <span className="text-danger">*</span>}
      </span>
      {children}
      {error && <span className="text-danger mt-1.5 block text-sm font-normal">{error}</span>}
    </label>
  );
}
