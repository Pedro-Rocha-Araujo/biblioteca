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

export async function postBook(request: Request, response: Response) {
  try { 
    const { title, author, isbn, quantity } = request.body
    if(!title || !author || quantity < 1) {
      return response.status(400).json({ Mensagem: "Informações não preenchidas" })
    }
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        quantity
      }
    })
    return response.status(201).json(newBook)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar livro",
      Erro: erro
    })
  }
}