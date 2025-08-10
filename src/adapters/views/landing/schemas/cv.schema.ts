import { z } from "zod";
import { BasicsSchema } from "./basics.schema";
import { WorkExperienceSchema } from "./work.schema";
import { EducationSchema } from "./education.schema";
import { CourseSchema } from "./course.schema";

export const CVDataSchema = z.object({
  basics: BasicsSchema,
  work: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  skills: z.array(z.string()).optional(),
  courses: z.array(CourseSchema).optional(),
});

export type CVData = z.infer<typeof CVDataSchema>;
