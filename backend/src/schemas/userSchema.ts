import { z } from "zod"

export const userSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome"),
  email: z.email("Informe um email válido").trim(),
})