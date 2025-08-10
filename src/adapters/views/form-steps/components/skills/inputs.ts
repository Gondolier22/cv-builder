import type { FormField } from "@/components/form/types";
import { t } from "i18next";
const stepInputs: FormField[][] = [
  [
    {
      id: "skill",
      label: t("cv.builder.form.skills.fields.skill.label"),
      type: "input",
      name: "skill",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.skills.fields.skill.placeholder"),
        required: true,
      },
    },
  ],
];

export default stepInputs;
