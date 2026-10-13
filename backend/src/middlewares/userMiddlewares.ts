import type { Request, Response, NextFunction } from "express"
import Jwt from "jsonwebtoken"

export function checkToken(request: Request, response: Response, next: NextFunction) {
  try {
    const auth = request.get("Authorization")
    if(!auth) {
      return response.status(401).json({ Mensagem: "Token não informado" })
    }
    const [ tipo, token ] = auth?.split(" ")
    if(tipo !== "Bearer" || !token) {
      return response.status(401).json({ Mensagem: "Token ou tipo inválido" })
    }
    const decoded = Jwt.verify(token, process.env.JWT_PASSWORD!)
    if (typeof decoded === "string" || typeof decoded.userId !== "number") {
      return response.status(401).json({
        Mensagem: "Token inválido",
      });
    }
    request.userId = decoded.userId
    next()
  } catch(erro) {
    console.log(erro)
    return response.status(401).json({
      Mensagem: "Token inválido ou expirado",
    })
  }
}