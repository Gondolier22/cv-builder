import type { FormField } from "@/components/form/types";
import { t } from "i18next";
const stepInputs: FormField[][] = [
  [
    {
      id: "name",
      label: t("cv.builder.form.languages.fields.name.label"),
      type: "input",
      name: "name",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.languages.fields.name.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      id: "reading",
      label: t("cv.builder.form.languages.fields.reading.label"),
      type: "input",
      name: "reading",
      props: {
        placeholder: t("cv.builder.form.languages.fields.reading.placeholder"),
        required: true,
      },
    },
    {
      id: "writing",
      label: t("cv.builder.form.languages.fields.writing.label"),
      type: "input",
      name: "writing",
      props: {
        placeholder: t("cv.builder.form.languages.fields.writing.placeholder"),
        required: true,
      },
    },
    {
      id: "speaking",
      label: t("cv.builder.form.languages.fields.speaking.label"),
      type: "input",
      name: "speaking",
      props: {
        placeholder: t("cv.builder.form.languages.fields.speaking.placeholder"),
        required: true,
      },
    },
  ],
];

export default stepInputs;
