import type { Request, Response } from "express"
import { Prisma } from "../generated/prisma/client.js"
import { bookSchema } from "../schemas/bookSchema.js"
import { uuidSchema } from "../schemas/uuidSchema.js"
import prisma from "../prisma.js"

export async function getBooks(_request: Request, response: Response) {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        title: "asc"
      }
    })
    return response.status(200).json(books)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar os livros",
      Erro: erro
    })
  }
}

export async function getOutOfPrintBooks(_request: Request, response: Response) {
  try {
    const books = await prisma.book.findMany({
      where: {
        quantity: 0
      },
      orderBy: {
        title: "asc"
      }
    })
    return response.status(200).json(books)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar os livros esgotados.",
      Erro: erro
    })
  }
}

export async function getBook(request: Request, response: Response) {
  try {
    const { book_id } = request.params
    const result = uuidSchema.safeParse(book_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    const book = await prisma.book.findUnique({
      where: {
        id: result.data
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
    const result = bookSchema.safeParse(request.body)
    if(!result.success) {
      return response.status(400).json({ 
        Mensagem: "Dado(s) inválido(s)",
        Erro: result.error.issues
      })
    }
    const { title, author, isbn, quantity, genre } = result.data
    if(isbn !== null) {
      const searchBook = await prisma.book.findUnique({
        where: {
          isbn
        }
      })
      if(searchBook) {
        return response.status(409).json({ Mensagem: "ISBN já cadastrado" })
      }
    }
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        quantity,
        genre
      }
    })
    return response.status(201).json(newBook)
  } catch(erro) {
    if(erro instanceof Prisma.PrismaClientKnownRequestError) {
      if(erro.code === "P2002") {
        return response.status(409).json({ Mensagem: "O ISBN deste livro já foi cadastrado" })
      }
    }
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar livro",
      Erro: erro
    })
  }
}

export async function putBook(request: Request, response: Response) {
  try { 
    const { book_id } = request.params
    const result = uuidSchema.safeParse(book_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    const { title, author, isbn, quantity, genre } = request.body
    let prev_isbn = isbn
    if(!prev_isbn) {
      prev_isbn = null
    }
    if(!title || !author || !genre) {
      return response.status(400).json({ Mensagem: "Informações não preenchidas" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: result.data
      }
    })
    if(!verifyBook) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    const verifyIsbn = prev_isbn ? await prisma.book.findUnique({
      where: {
        isbn: prev_isbn
      }
    }): null
    if(verifyIsbn && verifyIsbn.id !== result.data) {
      return response.status(409).json({ Mensagem: "Isbn já cadastrado" })
    }
    const editBook = await prisma.book.update({
      where: {
        id: result.data
      },
      data: {
        title,
        author,
        isbn: prev_isbn,
        quantity,
        genre
      }
    })
    return response.status(200).json(editBook)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar livro",
      Erro: erro
    })
  }
}

export async function deleteBook(request: Request, response: Response) {
  try {
    const { book_id } = request.params
    const result = uuidSchema.safeParse(book_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do livro não informado" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: result.data
      }
    })
    if(!verifyBook) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    const verifyLoan = await prisma.loan.findFirst({
      where: {
        bookId: result.data,
        returnDate: null
      }
    })
    if(verifyLoan) {
      return response.status(409).json({ Mensagem: "Impossível excluir o livro por pendências" })
    }
    await prisma.book.delete({
      where: {
        id: result.data
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