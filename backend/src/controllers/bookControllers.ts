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

export async function getBook(request: Request, response: Response) {
  try {
    const { book_id } = request.params
    if(!book_id || Number(book_id) < 1) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    const book = await prisma.book.findUnique({
      where: {
        id: Number(book_id)
      }
    })
    if(!book) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    return response.status(200).json(book)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar o livro",
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

export async function putBook(request: Request, response: Response) {
  try { 
    const { book_id } = request.params
    const { title, author, isbn, quantity } = request.body
    if(!book_id) {
      return response.status(400).json({ Mensagem: "Id do livro não informado" })
    }
    if(!title || !author || quantity < 1) {
      return response.status(400).json({ Mensagem: "Informações não preenchidas" })
    }
    const editBook = await prisma.book.update({
      where: {
        id: Number(book_id)
      },
      data: {
        title,
        author,
        isbn,
        quantity
      }
    })
    return response.status(200).json(editBook)
  } catch(erro) {
    return response.status(404).json({
      Mensagem: "Erro ao cadastrar livro",
      Erro: erro
    })
  }
}

export async function deleteBook(request: Request, response: Response) {
  try {
    const { book_id } = request.params
    if(!book_id) {
      return response.status(400).json({ Mensagem: "Id do livro não informado" })
    }
    await prisma.book.delete({
      where: {
        id: Number(book_id)
      }
    })
    return response.status(200).json({ Mensagem: "Livro deletado com sucesso" })
  } catch(erro) {
    return response.status(404).json({
      Mensagem: "Erro ao deletar livro",
      Erro: erro
    })
    }
}