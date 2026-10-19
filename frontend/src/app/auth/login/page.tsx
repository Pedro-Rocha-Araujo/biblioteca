'use client'

import { useRouter } from "next/navigation"
import Link from "next/link"
import { apiAuth } from "@/api"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import "../auth.css"

export default function Login() {
  const router = useRouter()

  async function logarBibliotecario(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")
      const password = formData.get("password")
      if(!email || !password) {
        toast.error("Preencha todos os campos")
        return
      }
      const response = await apiAuth.post("/login", {
        email, password
      })
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
          <h1><i className="fa-solid fa-circle-user"></i> Login</h1>
          <form onSubmit={logarBibliotecario}>
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
            <button>Entrar</button>
          </form>
          <p>Não possui uma conta? <Link href={`/auth/cadastro`}>Cadastrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}