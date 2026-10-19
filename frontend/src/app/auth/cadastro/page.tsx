'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "react-toastify"
import { apiAuth } from "@/api"
import Cookies from "js-cookie"
import "../auth.css"

export default function Cadastro() {
  const router = useRouter()

  async function cadastrarBibliotecario(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const name = formData.get("name")
      const email = formData.get("email")
      const password = formData.get("password")
      const response = await apiAuth.post("/register", {
        name, email, password
      })
      console.log(response.data)
      const token = response.data.token
      Cookies.set("token", token)
      router.push("/private/home")
    } catch(erro) {
      console.log(erro)
      toast.error("Erro!")
    }
  }

  return (
    <div className="auth-background">

      <div className="auth">

        <div className="div-image">
          <img 
            src={`/prateleira-login.jpg`}
          />
        </div>

        <div className="auth-form">
          <h1><i className="fa-solid fa-circle-user"></i> Cadastro</h1>
          <form onSubmit={cadastrarBibliotecario}>
            <input 
              placeholder="Digite seu nome"
              type="text"
              name="name"
              required
            />
            <input 
              placeholder="Digite seu e-mail"
              type="text"
              name="email"
              required
            />
            <input 
              placeholder="Digite sua senha"
              type="password"
              name="password"
              required
            />
            <button>Cadastrar</button>
          </form>
          <p>Já possui uma conta? <Link href={`/auth/login`}>Entrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}