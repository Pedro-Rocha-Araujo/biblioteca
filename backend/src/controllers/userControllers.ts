import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../prisma.js"
import "dotenv/config"

const salt = 10

export async function userRegister(request: Request, response: Response) {
  try {
    const { name, email, password } = request.body
    if(!name || !email || !password) {
      return response.status(400).json({ Mensagem: "Campos obrigatórios não preenchidos" })
    }
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })
    const token = await jwt.sign(
      { userId: newUser.id, userName: newUser.name }, 
      process.env.SENHA_JWT!, 
      { expiresIn: "1h" })
    return response.status(201).json({ 
      Mensagem: "Usuário criado com sucesso",
      token
    })
  } catch(erro) {
    return response.status(500).json({ 
      Mensagem: "Erro ao criar usuário"
     })
  }
} 

export async function userLogin(request: Request, response: Response) {
  
}