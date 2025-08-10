import { t } from "i18next";
import { z } from "zod";

export const SkillsSchema = z.object({
  skill: z
    .string()
    .min(1, t("cv.builder.form.skills.validation.skill.minLength")),
});

export type Skills = z.infer<typeof SkillsSchema>;
