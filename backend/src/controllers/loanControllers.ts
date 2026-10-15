import { Request, Response } from "express"
import prisma from "../prisma.js"

export async function getLoans(_request: Request, response: Response) {
  try {
    const loans = await prisma.loan.findMany({
      where: {
        returnDate: null
      },
      include: {
        book: true,
        user: true,
        librarian: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return response.status(200).json(loans)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cuscar os empréstimos",
      Erro: erro
    })
  }
}

export async function getUserLoans(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
      Erro: erro
    })
  }
}

export async function getLoan(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
      Erro: erro
    })
  }
}

export async function postLoan(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
      Erro: erro
    })
  }
}

export async function returnLoan(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
      Erro: erro
    })
  }
}

export async function deleteLoan(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
      Erro: erro
    })
  }
}