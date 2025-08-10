import { z } from "zod";
import { LocationSchema } from "./location.schema";
import { ProfileSchema } from "./profile.schema";
import i18n from "i18next";

const t = (key: string) => i18n.t(key);

export const BasicsSchema = z.object({
  name: z
    .string()
    .min(3, t("cv.builder.form.basics.validation.name.minLength")),
  image: z
    .union([
      z.instanceof(File),
      z.instanceof(FileList),
      z.string().url(),
      z.string().startsWith("data:image/"), // base64
      z.literal(""),
      z.undefined(),
    ])
    .optional()
    .transform((val) => {
      // Si es FileList, tomar el primer archivo
      if (val instanceof FileList) {
        return val.length > 0 ? val[0] : undefined;
      }
      return val;
    })
    .refine(
      (val) => {
        // Validar que si es un archivo, sea una imagen
        if (val instanceof File) {
          return val.type.startsWith("image/");
        }
        return true;
      },
      {
        message: t("cv.builder.form.basics.validation.image.invalid"),
      }
    ),
  email: z.email(t("cv.builder.form.basics.validation.email.invalid")),
  phone: z
    .string()
    .min(9, t("cv.builder.form.basics.validation.phone.minLength"))
    .regex(
      /^\+?[0-9\s-]+$/,
      t("cv.builder.form.basics.validation.phone.invalid")
    ),
  url: z
    .union([
      z.string().url(t("cv.builder.form.basics.validation.url.invalid")),
      z.literal(""),
    ])
    .optional(),
  summary: z
    .string()
    .min(30, t("cv.builder.form.basics.validation.summary.minLength"))
    .optional(),
  location: LocationSchema,
  profiles: z.array(ProfileSchema).optional(),
});

export type Basics = z.infer<typeof BasicsSchema>;
