import { Request, Response } from "express"
import prisma from "../prisma.js"

export async function getLoans(request: Request, response: Response) {
  try {

  } catch(erro) {
    return response.status(500).json({
      Mensagem: "",
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