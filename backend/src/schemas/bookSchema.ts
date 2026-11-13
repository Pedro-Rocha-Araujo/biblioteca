import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().trim().min(1, "Informe o título"),
  author: z.string().trim().min(1, "Informe o autor"),
  genre: z.string().trim().min(1, "Informe um Gênero válido"),
  isbn: z.string().trim().transform(value=>value||null).optional(),
  quantity: z.coerce.number().int().positive()
}) 