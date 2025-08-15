import type { CVData } from "@/store/cv";
import { z } from "zod";
import {
  CVDataSchema,
  CVDataFromJSONSchema,
  type CVDataFromJSON,
  WorkExperienceSchema,
  EducationSchema,
  ProjectSchema,
  CourseSchema,
} from "../schemas";

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
          code: err.code,
        })),
      };
    }
    return {
      success: false,
      data: null,
      errors: [
        {
          path: "unknown",
          message: "Unknown validation error",
          code: "custom",
        },
      ],
    };
  }
};

// Función para validar JSON string
export const validateJSONString = (jsonString: string) => {
  try {
    const parsed = JSON.parse(jsonString);
    return { success: true, data: parsed, error: null };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : "Invalid JSON format",
    };
  }
};

// Función específica para validar CV desde JSON con validación flexible
export const validateCVFromJSON = (data: unknown) => {
  // Primero validamos que sea un objeto válido
  if (!data || typeof data !== "object") {
    return {
      success: false,
      data: null,
      errors: [
        {
          path: "root",
          message: "Los datos deben ser un objeto válido",
          code: "invalid_type",
        },
      ],
    };
  }

  // Validación con el esquema específico para JSON
  const result = validateDataWithErrors(CVDataFromJSONSchema, data);

  if (result.success) {
    return {
      success: true,
      data: result.data as CVDataFromJSON,
      errors: null,
      warnings: generateWarnings(result.data as CVDataFromJSON),
    };
  }

  return {
    success: false,
    data: null,
    errors: result.errors,
    warnings: null,
  };
};

// Función para validar CV completo desde archivo JSON
export const validateCVJSONFile = async (file: File) => {
  try {
    // Verificar que sea un archivo JSON
    if (!file.name.endsWith(".json")) {
      return {
        success: false,
        data: null,
        errors: [
          {
            path: "file",
            message: "El archivo debe ser de tipo JSON (.json)",
            code: "invalid_type",
          },
        ],
      };
    }

    // Leer el contenido del archivo
    const fileContent = await file.text();

    // Validar que sea JSON válido
    const jsonValidation = validateJSONString(fileContent);
    if (!jsonValidation.success) {
      return {
        success: false,
        data: null,
        errors: [
          {
            path: "json",
            message: `JSON inválido: ${jsonValidation.error}`,
            code: "invalid_json",
          },
        ],
      };
    }

    // Validar la estructura del CV
    return validateCVFromJSON(jsonValidation.data);
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: [
        {
          path: "file",
          message:
            error instanceof Error
              ? error.message
              : "Error al procesar el archivo",
          code: "file_error",
        },
      ],
    };
  }
};

// Función para generar advertencias sobre datos opcionales o incompletos
const generateWarnings = (
  data: CVDataFromJSON
): Array<{ path: string; message: string }> => {
  const warnings: Array<{ path: string; message: string }> = [];

  // Verificar datos básicos opcionales
  if (!data.basics.label) {
    warnings.push({
      path: "basics.label",
      message: "El título/posición no está definido",
    });
  }

  if (!data.basics.summary) {
    warnings.push({
      path: "basics.summary",
      message: "El resumen profesional no está definido",
    });
  }

  if (!data.basics.image) {
    warnings.push({
      path: "basics.image",
      message: "No se ha definido una imagen de perfil",
    });
  }

  if (!data.basics.profiles || data.basics.profiles.length === 0) {
    warnings.push({
      path: "basics.profiles",
      message: "No se han definido perfiles en redes sociales",
    });
  }

  // Verificar secciones vacías
  if (!data.work || data.work.length === 0) {
    warnings.push({
      path: "work",
      message: "No se ha definido experiencia laboral",
    });
  }

  if (!data.education || data.education.length === 0) {
    warnings.push({
      path: "education",
      message: "No se ha definido información educativa",
    });
  }

  if (!data.skills || data.skills.length === 0) {
    warnings.push({
      path: "skills",
      message: "No se han definido habilidades",
    });
  }

  if (!data.projects || data.projects.length === 0) {
    warnings.push({
      path: "projects",
      message: "No se han definido proyectos",
    });
  }

  if (!data.courses || data.courses.length === 0) {
    warnings.push({
      path: "courses",
      message: "No se han definido cursos o certificaciones",
    });
  }

  return warnings;
};

// Función para validar parcialmente secciones del CV (útil para validación en tiempo real)
export const validateCVSection = (sectionName: string, data: unknown) => {
  try {
    let result;

    switch (sectionName) {
      case "basics":
        result = CVDataFromJSONSchema.shape.basics.safeParse(data);
        break;
      case "work":
        result = z.array(WorkExperienceSchema).safeParse(data);
        break;
      case "education":
        result = z.array(EducationSchema).safeParse(data);
        break;
      case "skills":
        result = z.array(z.string()).safeParse(data);
        break;
      case "projects":
        result = z.array(ProjectSchema).safeParse(data);
        break;
      case "courses":
        result = z.array(CourseSchema).safeParse(data);
        break;
      default:
        return {
          success: false,
          data: null,
          errors: [
            {
              path: "section",
              message: `Sección desconocida: ${sectionName}`,
              code: "invalid_section",
            },
          ],
        };
    }

    if (result.success) {
      return { success: true, data: result.data, errors: null };
    } else {
      return {
        success: false,
        data: null,
        errors: result.error.issues.map((err) => ({
          path: err.path.join("."),
          message: err.message,
          code: err.code,
        })),
      };
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      errors: [
        {
          path: "validation",
          message:
            error instanceof Error ? error.message : "Error en la validación",
          code: "validation_error",
        },
      ],
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
