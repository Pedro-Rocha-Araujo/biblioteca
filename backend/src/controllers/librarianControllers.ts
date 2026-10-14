import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import prisma from "../prisma.js"
import "dotenv/config"

const salt = 10

export async function librarianRegister(request: Request, response: Response) {
  try {
    const { name, email, password } = request.body
    if(!name || !email || !password) {
      return response.status(400).json({ Mensagem: "Campos obrigatórios não preenchidos" })
    }
    const verifyLibrarian = await prisma.librarian.findUnique({
      where: { email }
    });
    if(verifyLibrarian) {
      return response.status(409).json({ Mensagem: "E-mail já cadastrado" })
    }
    const hashedPassword = await bcrypt.hash(password, salt)
    const newLibrarian = await prisma.librarian.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
    const token = jwt.sign(
      { librarianId: newLibrarian.id },
      process.env.JWT_PASSWORD!,
      { expiresIn: "1h" }
    )
    return response.status(201).json({
      Mensagem: "Bibliotecário cadastrado com sucesso",
      token: token
    })
  } catch(erro) {
    return response.status(500).json({ Mensagem: "Erro ao cadastrar o bibliotecário" })
  }
}

export async function librarianLogin(request: Request, response: Response) {
  try {
    const { email, password } = request.body
    if(!email || !password) {
      return response.status(400).json({ Mensagem: "Informações obrigatórias não preenchidas" })
    }
    const verifyLibrarian = await prisma.librarian.findFirst({
      where: {
        email
      }
    })
    if(!verifyLibrarian) {
      return response.status(401).json({ Mensagem: "Dado(s) incorreto(s)" })
    }
    const verifyPassword = await bcrypt.compare(password, verifyLibrarian.password)
    if(!verifyPassword) {
      return response.status(401).json({ Mensagem: "Dado(s) incorreto(s)" })
    }
    const token = await jwt.sign(
      { librarianId: verifyLibrarian.id },
      process.env.JWT_PASSWORD!,
      { expiresIn: "1h" }
    )
    return response.status(200).json({
      Mensagem: "Login feito com sucesso",
      token: token
    })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao realizar o login"
    })
  }
}