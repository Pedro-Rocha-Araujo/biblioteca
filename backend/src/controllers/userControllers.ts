import type { Request, Response } from "express"
import prisma from "../prisma.js"
import "dotenv/config"

export async function userRegister(request: Request, response: Response) {
  try {
    const { name, email } = request.body
    if(!name || !email) {
      return response.status(400).json({ Mensagem: "Campos obrigatórios não preenchidos" })
    }
    await prisma.user.create({
      data: {
        name: name,
        email: email
      }
    })
    return response.status(201).json({ 
      Mensagem: "Usuário criado com sucesso",
    })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao criar usuário"
     })
  }
} 

export async function getUserProfile(request: Request, response: Response) {
  try {
    const userId = Number(request.params.userId)
    if(!userId || userId < 1) {
      return response.status(401).json({ Mensagem: "Id do usuário não informado" })
    }
    const searchUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!searchUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    return response.status(200).json(searchUser)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar o perfil do usuário",
      Erro: erro
    })
  }
}

export async function deleteUserProfile(request: Request, response: Response) {
  try {
    const userId = Number(request.params.userId)
    if(!userId || userId < 1) {
      return response.status(401).json({ Mensagem: "Id do usuário não informado" })
    }
    const verifyLoan = await prisma.loan.findFirst({
      where: {
        userId,
        returnDate: null
      }
    })
    if(verifyLoan) {
      return response.status(409).json({ Mensagem: "O usuário possui pendências que precisam ser resolvidas" })
    }
    await prisma.user.delete({
      where: {
        id: userId
      }
    })
    return response.status(200).json({ Mensagem: "Usuário deletado com sucesso" })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao deletar o perfil",
      Erro: erro
    })
  }
}