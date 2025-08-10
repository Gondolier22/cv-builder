import type { CVData } from "@/store/cv";
import { z } from "zod";
import { CVDataSchema } from "../schemas";

// Función de validación genérica
export const validateData = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): data is T => {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
};

// Función genérica que devuelve errores detallados
export const validateDataWithErrors = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
) => {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: null,
        errors: error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ path: "unknown", message: "Unknown validation error" }],
    };
  }
};

// Funciones específicas para CV (mantener compatibilidad)
export const validateCVData = (data: unknown): data is CVData => {
  return validateData(CVDataSchema, data);
};

export const validateCVDataWithErrors = (data: unknown) => {
  return validateDataWithErrors(CVDataSchema, data);
};
