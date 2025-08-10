import { t } from "i18next";
import { z } from "zod";

export const WorkExperienceSchema = z.object({
  company: z
    .string()
    .min(5, t("cv.builder.form.work.validation.company.minLength")),
  position: z
    .string()
    .min(5, t("cv.builder.form.work.validation.position.minLength")),
  url: z.union([
    z.url(t("cv.builder.form.work.validation.url.invalid")),
    z.literal(""),
  ]),
  startDate: z.string().min(10, {
    message: t("cv.builder.form.work.validation.startDate.minLength"),
  }),
  endDate: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: t("cv.builder.form.work.validation.endDate.minLength"),
    }),
  summary: z
    .string()
    .min(50, t("cv.builder.form.work.validation.summary.minLength")),
});

export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
