"use client";

import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, LoaderCircle, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Link } from "@/i18n/routing";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { consultationService } from "../services/consultationService";
import type {
  ConsultationCreatedResponse,
  ConsultationFormPayload,
} from "../types/consultation.types";

type FormValues = ConsultationFormPayload;

const requestTypes = [
  { value: "ADMISSION_CONSULTING", labelKey: "request_admission" },
  { value: "CAMPUS_VISIT", labelKey: "request_visit" },
  { value: "RECEIVE_MATERIALS", labelKey: "request_materials" },
  { value: "APPLICATION_REGISTRATION", labelKey: "request_application" },
] as const;

const majorKeys = [
  "information_technology",
  "software_engineering",
  "artificial_intelligence",
  "electrical_engineering",
  "electronics_telecommunications",
  "control_automation",
  "civil_engineering",
  "automotive_engineering",
] as const;

function getSubmitError(error: unknown, duplicateMessage: string, genericMessage: string): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof error.response === "object" &&
    error.response !== null &&
    "data" in error.response
  ) {
    const data = error.response.data as {
      error?: { code?: string };
    };
    if (data.error?.code === "DUPLICATE_CONSULTATION") return duplicateMessage;
  }
  return genericMessage;
}

export function ConsultationForm() {
  const t = useTranslations("consultation");
  const [result, setResult] = useState<ConsultationCreatedResponse | null>(null);
  const [submitError, setSubmitError] = useState("");
  const schema = useMemo(
    () =>
      z.object({
        full_name: z.string().trim().min(2, t("errors.full_name")).max(120),
        phone: z
          .string()
          .trim()
          .regex(/^(?:\+84|0)[0-9\s().-]{8,14}$/, t("errors.phone")),
        email: z.string().trim().email(t("errors.email")).max(255),
        interested_major: z.string().trim().min(2, t("errors.major")).max(255),
        request_type: z.enum([
          "ADMISSION_CONSULTING",
          "CAMPUS_VISIT",
          "RECEIVE_MATERIALS",
          "APPLICATION_REGISTRATION",
        ]),
        message: z.string().trim().max(2000, t("errors.message_length")).optional(),
        consent_given: z.boolean().refine((value) => value, t("errors.consent")),
        website: z.string().max(0).optional(),
      }),
    [t],
  );
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
      const response = await consultationService.create(values);
      setResult(response);
    } catch (error) {
      setSubmitError(getSubmitError(error, t("errors.duplicate"), t("errors.generic")));
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
          {t("success_title")}
        </h2>
        <p className="text-muted-foreground mt-3 max-w-md leading-7">{t("success_description")}</p>
        <div className="border-border bg-section-alt mt-6 rounded-[var(--radius-md)] border px-5 py-4">
          <p className="text-muted-foreground text-sm">{t("reference_label")}</p>
          <p className="text-brand-blue mt-1 text-lg font-bold tracking-wide">
            {result.reference_code}
          </p>
        </div>
        <Link href="/" className={cn(buttonVariants(), "mt-7")}>
          {t("back_home")}
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
        <Field label={t("full_name")} error={errors.full_name?.message} required>
          <input
            {...register("full_name")}
            className={inputClassName}
            autoComplete="name"
            placeholder={t("full_name_placeholder")}
            aria-invalid={Boolean(errors.full_name)}
          />
        </Field>

        <Field label={t("phone")} error={errors.phone?.message} required>
          <input
            {...register("phone")}
            className={inputClassName}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t("phone_placeholder")}
            aria-invalid={Boolean(errors.phone)}
          />
        </Field>

        <Field label={t("email")} error={errors.email?.message} required>
          <input
            {...register("email")}
            className={inputClassName}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t("email_placeholder")}
            aria-invalid={Boolean(errors.email)}
          />
        </Field>

        <Field label={t("major")} error={errors.interested_major?.message} required>
          <input
            {...register("interested_major")}
            className={inputClassName}
            list="admission-majors"
            placeholder={t("major_placeholder")}
            aria-invalid={Boolean(errors.interested_major)}
          />
          <datalist id="admission-majors">
            {majorKeys.map((majorKey) => (
              <option key={majorKey} value={t(`majors.${majorKey}`)} />
            ))}
          </datalist>
        </Field>

        <Field label={t("request_type")} error={errors.request_type?.message} required>
          <select
            {...register("request_type")}
            className={inputClassName}
            aria-invalid={Boolean(errors.request_type)}
          >
            {requestTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {t(type.labelKey)}
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
          <Field label={t("message")} error={errors.message?.message}>
            <textarea
              {...register("message")}
              className={`${inputClassName} min-h-32 resize-y`}
              placeholder={t("message_placeholder")}
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
            {t("consent")} <span className="text-danger">*</span>
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
          {t("privacy_note")}
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="sm:min-w-44">
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
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
