import { z } from "zod";

export const CourseSchema = z.object({
  title: z.string().min(3, "Course title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Course description must be at least 10 characters long"),
  duration: z.string().optional(),
  institution: z
    .string()
    .min(2, "Institution name must be at least 2 characters long"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  certificate: z
    .union([z.url("Certificate URL must be a valid URL"), z.literal("")])
    .optional(),
});
