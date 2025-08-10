import { t } from "i18next";
import { z } from "zod";

export const ProjectSchema = z.object({
  name: z
    .string()
    .min(3, t("cv.builder.form.projects.validation.name.minLength")),
  description: z
    .string()
    .min(20, t("cv.builder.form.projects.validation.description.minLength")),
  startDate: z.string().min(10, {
    message: t("cv.builder.form.projects.validation.startDate.invalidFormat"),
  }),
  endDate: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 10, {
      message: t("cv.builder.form.projects.validation.endDate.invalidFormat"),
    }),
  url: z.string().url(t("cv.builder.form.projects.validation.url.invalid")),
  avatar: z
    .string()
    .url(t("cv.builder.form.projects.validation.avatar.invalid"))
    .optional()
    .or(z.literal("")),
  github: z
    .string()
    .url(t("cv.builder.form.projects.validation.github.invalid"))
    .optional()
    .or(z.literal("")),
});

export type Project = z.infer<typeof ProjectSchema>;
