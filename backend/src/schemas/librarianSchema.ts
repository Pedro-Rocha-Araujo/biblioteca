import { z } from "zod"

export const librarianSchema = z.object({
  name: z.string().trim().min(1, "Informe o nome"),
  email: z.email("Informe um e-mail válido").trim(),
  password: z.string().trim().min(3, "A senha precisa ter no mínimo 3 caracteres"),
})

export const librarianLoginSchema = z.object({
  email: z.email("Informe um e-mail válido").trim(),
  password: z.string().trim().min(3, "A senha precisa ter no mínimo 3 caracteres")
})