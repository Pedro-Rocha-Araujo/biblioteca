import type { Request, Response } from "express"

export default async function librarianRegister(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({ Mensagem: "Erro ao cadastrar o bibliotecário" })
  }
}