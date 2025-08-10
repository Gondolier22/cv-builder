import type { FieldValues, SubmitHandler } from "react-hook-form";
import type { z } from "zod";

export type FormField = {
  type: "input" | "textarea";
  id: string;
  name: string;
  label: string;
  props: Record<string, any>;
};

export type FormProps<T extends FieldValues> = {
  fields: FormField[][];
  onSubmit: SubmitHandler<T>;
  schema: z.ZodType<T>;
  btnSubmitText?: string;
  initialData?: Partial<T>;
};
