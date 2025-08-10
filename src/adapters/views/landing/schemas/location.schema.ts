import { z } from "zod";

export const LocationSchema = z.object({
  city: z.string().min(2, "City must be at least 2 characters long"),
  region: z.string().min(2, "Region must be at least 2 characters long"),
});

export type Location = z.infer<typeof LocationSchema>;
