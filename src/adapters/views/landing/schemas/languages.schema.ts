import { t } from "i18next";
import { z } from "zod";

export const LanguageSchema = z.object({
  name: z
    .string()
    .min(3, t("cv.builder.form.languages.validation.name.minLength")),
  reading: z
    .string()
    .min(2, t("cv.builder.form.languages.validation.reading.minLength")),
  writing: z
    .string()
    .min(2, t("cv.builder.form.languages.validation.writing.minLength")),
  speaking: z
    .string()
    .min(2, t("cv.builder.form.languages.validation.speaking.minLength")),
});

export type Language = z.infer<typeof LanguageSchema>;
