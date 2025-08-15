import { z } from "zod";
import { BasicsSchema } from "./basics.schema";
import { WorkExperienceSchema } from "./work.schema";
import { EducationSchema } from "./education.schema";
import { CourseSchema } from "./course.schema";
import { ProjectSchema } from "./projects.schema";
import { LocationSchema } from "./location.schema";
import { ProfileSchema } from "./profile.schema";

// Esquema específico para la validación de datos básicos desde JSON
const BasicsFromJSONSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  label: z.string().optional(),
  image: z.string().optional(), // Para JSON solo aceptamos string (URL o base64)
  email: z.string().email("Email inválido"),
  phone: z.string().min(9, "Teléfono debe tener al menos 9 caracteres"),
  url: z.string().url("URL inválida").optional().or(z.literal("")),
  summary: z.string().optional(),
  location: LocationSchema,
  profiles: z.array(ProfileSchema).optional().default([]),
});

// Esquema para validar CV completo desde JSON
export const CVDataSchema = z.object({
  basics: BasicsSchema,
  work: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()).optional().default([]),
  courses: z.array(CourseSchema).optional().default([]),
  projects: z.array(ProjectSchema).optional().default([]),
});

// Esquema específico para validar JSON cargado desde archivo
export const CVDataFromJSONSchema = z.object({
  basics: BasicsFromJSONSchema,
  work: z.array(WorkExperienceSchema).default([]),
  education: z.array(EducationSchema).default([]),
  skills: z.array(z.string()).optional().default([]),
  courses: z.array(CourseSchema).optional().default([]),
  projects: z.array(ProjectSchema).optional().default([]),
});

export type CVData = z.infer<typeof CVDataSchema>;
export type CVDataFromJSON = z.infer<typeof CVDataFromJSONSchema>;
