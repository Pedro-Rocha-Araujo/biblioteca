import type { Request, Response } from "express"
import { Prisma } from "../generated/prisma/client.js"
import { userSchema } from "../schemas/userSchema.js"
import prisma from "../prisma.js"
import "dotenv/config"

export async function getUsers(_request: Request, response: Response) {
  try {
    const users = await prisma.user.findMany()
    return response.status(200).json(users)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar o perfil do usuário",
      Erro: erro
    })
  }
}

export async function userRegister(request: Request, response: Response) {
  try {
    const result = userSchema.safeParse(request.body)
    if(!result.success) {
      return response.status(400).json({ 
        Mensagem: "Campos obrigatórios não preenchidos",
        Erros: result.error.issues 
      })
    }
    const { name, email } = result.data
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
    if(erro instanceof Prisma.PrismaClientKnownRequestError) {
      if(erro.code === "P2002") {
        return response.status(409).json({ Mensagem: "E-mail já cadastrado" })
      }
    }
    return response.status(500).json({ 
      Mensagem: "Erro ao criar usuário"
     })
  }
} 

export async function getUserProfile(request: Request, response: Response) {
  try {
    const userId = Number(request.params.user_id)
    if(!Number.isInteger(userId) || userId < 1) {
      return response.status(401).json({ Mensagem: "Id do usuário não informado ou inválido" })
    }
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    return response.status(200).json(verifyUser)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar o perfil do usuário",
      Erro: erro
    })
  }
}

export async function editUserProfile(request: Request, response: Response) {
  try {
    const userId = Number(request.params.user_id)
    const result = userSchema.safeParse(request.body)
    if(!result.success) {
      return response.status(400).json({ 
        Mensagem: "Campos obrigatórios não preenchidos",
        Erros: result.error.issues
      })
    }
    const { name, email } = result.data
    if(!Number.isInteger(userId) || userId < 1) {
      return response.status(400).json({ Mensagem: "Id do usuário não informado ou inválido" })
    }
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    const verifyEmail = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    if(verifyEmail && verifyEmail.id !== userId) {
      return response.status(409).json({ Mensagem: "O email já está sendo usado" })
    }
    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        name: name,
        email: email
      }
    })
    return response.status(200).json({ Mensagem: "Usuário editado com sucesso" })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao editar o perfil do usuário",
      Erro: erro
    })
  }
}

export async function deleteUserProfile(request: Request, response: Response) {
  try {
    const userId = Number(request.params.user_id)
    if(!Number.isInteger(userId) || userId < 1) {
      return response.status(401).json({ Mensagem: "Id do usuário não informado ou inválido" })
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
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: userId
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    await prisma.user.delete({
      where: {
        id: userId
      }
    })
    return response.status(200).json({ Mensagem: "Usuário deletado com sucesso" })
  } catch(erro) {
    if(erro instanceof Prisma.PrismaClientKnownRequestError) {
      if(erro.code === "P2003") {
        return response.status(409).json({ Mensagem: "Registros pendentes não permitem a exclusão do usuário" })
      }
    }
    return response.status(500).json({
      Mensagem: "Erro ao deletar o perfil",
      Erro: erro
    })
  }
}