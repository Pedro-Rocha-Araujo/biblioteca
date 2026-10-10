import type { Request, Response } from "express"
import prisma from "../prisma.js"

export async function getBooks(_request: Request, response: Response) {
  try {
    const books = await prisma.book.findMany()
    return response.status(200).json(books)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar os livros",
      Erro: erro
    })
  }
}