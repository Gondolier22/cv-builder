import { z } from "zod";
import { t } from "i18next";

export const EducationSchema = z
  .object({
    institution: z
      .string()
      .min(5, t("cv.builder.form.education.validation.institution.minLength")),
    url: z
      .union([
        z.url(t("cv.builder.form.education.validation.url.invalid")),
        z.string().length(0),
      ])
      .optional(),
    title: z
      .string()
      .min(10, t("cv.builder.form.education.validation.title.minLength")),
    startDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        t("cv.builder.form.education.validation.startDate.invalidFormat")
      )
      .refine(
        (date) => !isNaN(Date.parse(date)),
        t("cv.builder.form.education.validation.startDate.invalidDate")
      ),
    endDate: z
      .string()
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        t("cv.builder.form.education.validation.endDate.invalidFormat")
      )
      .refine(
        (date) => !isNaN(Date.parse(date)),
        t("cv.builder.form.education.validation.endDate.invalidDate")
      )
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.endDate || data.endDate === "") return true;
      return new Date(data.startDate) <= new Date(data.endDate);
    },
    {
      message: t(
        "cv.builder.form.education.validation.endDate.mustBeAfterStart"
      ),
      path: ["endDate"],
    }
  );

export type Education = z.infer<typeof EducationSchema>;
