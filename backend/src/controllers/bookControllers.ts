import type { Request, Response } from "express"
import { Prisma } from "../generated/prisma/client.js"
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
    const book_id = Number(request.params.book_id)
    if(!Number.isInteger(book_id) || book_id < 1) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    const book = await prisma.book.findUnique({
      where: {
        id: book_id
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
    const { title, author, prev_isbn } = request.body
    let isbn = prev_isbn
    if(!isbn) {
      isbn = null
    }
    const quantity = Number(request.body.quantity)
    if(!title || !author || !Number.isInteger(quantity) || quantity < 1) {
      return response.status(400).json({ Mensagem: "Informações não preenchidas ou inválidas" })
    }
    if(isbn || isbn !== null) {
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
        quantity
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
    const book_id = Number(request.params.book_id)
    const { title, author, prev_isbn, quantity } = request.body
    let isbn = prev_isbn
    if(!isbn) {
      isbn = null
    }
    if(!Number.isInteger(book_id)) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    if(!title || !author) {
      return response.status(400).json({ Mensagem: "Informações não preenchidas" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: book_id
      }
    })
    if(!verifyBook) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    const editBook = await prisma.book.update({
      where: {
        id: book_id
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
    return response.status(500).json({
      Mensagem: "Erro ao cadastrar livro",
      Erro: erro
    })
  }
}

export async function deleteBook(request: Request, response: Response) {
  try {
    const book_id = Number(request.params.book_id)
    if(!Number.isInteger(book_id) || book_id < 1) {
      return response.status(400).json({ Mensagem: "Id do livro não informado ou inválido" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: book_id
      }
    })
    if(!verifyBook) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    const verifyLoan = await prisma.loan.findFirst({
      where: {
        bookId: book_id,
        returnDate: null
      }
    })
    if(verifyLoan) {
      return response.status(409).json({ Mensagem: "Impossível excluir o livro por pendências" })
    }
    await prisma.book.delete({
      where: {
        id: book_id
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