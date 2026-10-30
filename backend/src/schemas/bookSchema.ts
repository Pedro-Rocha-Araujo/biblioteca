import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().trim().min(1, "Informe o título"),
  author: z.string().trim().min(1, "Informe o autor"),
  isbn: z.string().trim().transform(value=>value||null).optional(),
  quantity: z.coerce.number().int().positive()
}) 