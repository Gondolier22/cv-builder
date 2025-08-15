import type { FormField } from "@/components/form/types";
import { t } from "i18next";

const StepInputs: FormField[][] = [
  [
    {
      type: "input",
      id: "name",
      name: "name",
      label: t("cv.builder.form.basics.fields.name.label"),
      props: {
        type: "text",
        placeholder: t("cv.builder.form.basics.fields.name.placeholder"),
        required: true,
      },
    },
    {
      type: "input",
      id: "email",
      name: "email",
      label: t("cv.builder.form.basics.fields.email.label"),
      props: {
        type: "email",
        placeholder: t("cv.builder.form.basics.fields.email.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      type: "input",
      id: "phone",
      name: "phone",
      label: t("cv.builder.form.basics.fields.phone.label"),
      props: {
        type: "tel",
        placeholder: t("cv.builder.form.basics.fields.phone.placeholder"),
        required: true,
      },
    },
    {
      type: "input",
      id: "url",
      name: "url",
      label: t("cv.builder.form.basics.fields.url.label"),
      props: {
        type: "url",
        placeholder: t("cv.builder.form.basics.fields.url.placeholder"),
        required: false,
      },
    },
  ],
  [
    {
      type: "input",
      id: "jobPosition",
      name: "jobPosition",
      label: t("cv.builder.form.basics.fields.jobPosition.label"),
      props: {
        type: "text",
        placeholder: t("cv.builder.form.basics.fields.jobPosition.placeholder"),
        required: true,
      },
    },
  ],
  [
    {
      type: "input",
      id: "image",
      name: "image",
      label: t("cv.builder.form.basics.fields.image.label"),
      props: {
        type: "file",
        accept: "image/*",
        placeholder: t("cv.builder.form.basics.fields.image.placeholder"),
        required: false,
      },
    },
  ],
  [
    {
      type: "textarea",
      id: "summary",
      name: "summary",
      label: t("cv.builder.form.basics.fields.summary.label"),
      props: {
        placeholder: t("cv.builder.form.basics.fields.summary.placeholder"),
        rows: 4,
        required: false,
      },
    },
  ],
  [
    {
      type: "input",
      id: "city",
      name: "location.city",
      label: t("cv.builder.form.basics.fields.city.label"),
      props: {
        type: "text",
        placeholder: t("cv.builder.form.basics.fields.city.placeholder"),
        required: true,
      },
    },
    {
      type: "input",
      id: "region",
      name: "location.region",
      label: t("cv.builder.form.basics.fields.region.label"),
      props: {
        type: "text",
        placeholder: t("cv.builder.form.basics.fields.region.placeholder"),
        required: true,
      },
    },
  ],
];

export default StepInputs;
