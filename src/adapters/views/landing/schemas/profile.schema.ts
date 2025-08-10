import { z } from "zod";

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string(),
  url: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
