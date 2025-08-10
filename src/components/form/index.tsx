import { useForm, type DefaultValues, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";
import type { FormProps } from "./types";
import Label from "./components/label";
import Input from "./components/input";
import Textarea from "./components/textarea";

const Form = <T extends FieldValues>({
  fields,
  onSubmit,
  schema,
  btnSubmitText = "Enviar",
  initialData,
}: FormProps<T>) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<T>({
    resolver: zodResolver(schema as ZodType<T, any, any>),
    defaultValues: initialData as DefaultValues<T>,
    mode: "onBlur",
  });

  const handleFormSubmit = (data: T) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {fields.map((row) => {
        return (
          <div
            className={`grid gap-6 ${
              row.length === 1
                ? "grid-cols-1"
                : row.length === 2
                ? "md:grid-cols-2 grid-cols-1"
                : row.length === 3
                ? "md:grid-cols-3 grid-cols-1"
                : `md:grid-cols-${row.length} grid-cols-1`
            }`}
          >
            {row.map((field) => {
              const fieldError = errors[field.name as keyof T];

              return (
                <div key={field.id} className="flex flex-col gap-1">
                  <Label htmlFor={field.id}>{field.label}</Label>

                  {field.type === "input" ? (
                    <Input
                      id={field.id}
                      {...field.props}
                      {...register(field.name as any)}
                    />
                  ) : field.type === "textarea" ? (
                    <Textarea
                      id={field.id}
                      {...field.props}
                      {...register(field.name as any)}
                    />
                  ) : null}

                  {fieldError && (
                    <p className="text-red-500 text-sm mt-1">
                      {(fieldError as any)?.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        disabled={!isValid}
      >
        {btnSubmitText}
      </button>
    </form>
  );
};

export default Form;
