import type { FormField } from "@/components/form/types";
import { t } from "i18next";
const stepInputs: FormField[][] = [
  [
    {
      id: "jobTitle",
      label: t("cv.builder.form.work.fields.position.label"),
      type: "input",
      name: "position",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.work.fields.position.placeholder"),
        required: true,
      },
    },
    {
      id: "companyName",
      label: t("cv.builder.form.work.fields.company.label"),
      type: "input",
      name: "company",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.work.fields.company.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      id: "startDate",
      label: t("cv.builder.form.work.fields.startDate.label"),
      type: "input",
      name: "startDate",
      props: {
        type: "date",
        required: true,
      },
    },
    {
      id: "endDate",
      label: t("cv.builder.form.work.fields.endDate.label"),
      type: "input",
      name: "endDate",
      props: {
        type: "date",
      },
    },
  ],
  [
    {
      id: "url",
      label: t("cv.builder.form.work.fields.url.label"),
      type: "input",
      name: "url",
      props: {
        type: "url",
        placeholder: t("cv.builder.form.work.fields.url.placeholder"),
        required: false,
      },
    },
  ],
  [
    {
      id: "summary",
      label: t("cv.builder.form.work.fields.summary.label"),
      type: "textarea",
      name: "summary",
      props: {
        placeholder: t("cv.builder.form.work.fields.summary.placeholder"),
        rows: 4,
        required: false,
      },
    },
  ],
];

export default stepInputs;
