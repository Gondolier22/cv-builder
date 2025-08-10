import type { FormField } from "@/components/form/types";
import { t } from "i18next";
const stepInputs: FormField[][] = [
  [
    {
      id: "name",
      label: t("cv.builder.form.projects.fields.name.label"),
      type: "input",
      name: "name",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.projects.fields.name.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      id: "url",
      label: t("cv.builder.form.projects.fields.url.label"),
      type: "input",
      name: "url",
      props: {
        type: "text",
        placeholder: t("cv.builder.form.projects.fields.url.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      id: "github",
      label: t("cv.builder.form.projects.fields.github.label"),
      type: "input",
      name: "github",
      props: {
        type: "url",
        placeholder: t("cv.builder.form.projects.fields.github.placeholder"),
        required: false,
      },
    },
  ],
  [
    {
      id: "startDate",
      label: t("cv.builder.form.projects.fields.startDate.label"),
      type: "input",
      name: "startDate",
      props: {
        type: "date",
        required: true,
      },
    },
    {
      id: "endDate",
      label: t("cv.builder.form.projects.fields.endDate.label"),
      type: "input",
      name: "endDate",
      props: {
        type: "date",
      },
    },
  ],
  [
    {
      id: "description",
      label: t("cv.builder.form.projects.fields.description.label"),
      type: "textarea",
      name: "description",
      props: {
        placeholder: t(
          "cv.builder.form.projects.fields.description.placeholder"
        ),
        rows: 4,
        required: false,
      },
    },
  ],
];

export default stepInputs;
