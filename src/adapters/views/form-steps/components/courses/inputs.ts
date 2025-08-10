import type { FormField } from "@/components/form/types";
import { t } from "i18next";
const stepInputs: FormField[][] = [
  [
    {
      id: "title",
      label: t("cv.builder.form.courses.fields.title.label"),
      type: "input",
      name: "title",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.courses.fields.title.placeholder"),
        required: true,
      },
    },
    {
      id: "institution",
      label: t("cv.builder.form.courses.fields.institution.label"),
      type: "input",
      name: "institution",
      props: {
        type: "text",
        placeholder: t(
          "cv.builder.form.courses.fields.institution.placeholder"
        ),
        required: true,
      },
    },
  ],
  [
    {
      id: "startDate",
      label: t("cv.builder.form.courses.fields.startDate.label"),
      type: "input",
      name: "startDate",
      props: {
        type: "date",
        required: true,
      },
    },
    {
      id: "endDate",
      label: t("cv.builder.form.courses.fields.endDate.label"),
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
      label: t("cv.builder.form.courses.fields.url.label"),
      type: "input",
      name: "url",
      props: {
        type: "url",
        placeholder: t("cv.builder.form.courses.fields.url.placeholder"),
        required: false,
      },
    },
  ],
];

export default stepInputs;
