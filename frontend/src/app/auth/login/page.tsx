'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import axios from "axios"
import { apiAuth } from "@/api"
import { toast } from "react-toastify"
import Cookies from "js-cookie"
import "../auth.css"
import { LibrarianInterface } from "@/interfaces/usersInterface"

export default function Login() {
  const { 
    register, handleSubmit, formState: { isSubmitting, errors } 
  } = useForm<LibrarianInterface>({ defaultValues: { email: "", password: "" } })

  const [visible, setVisible] = useState<boolean>(false)

  const router = useRouter()

  async function logarBibliotecario(data: LibrarianInterface) {
    const { email, password } = data
    try {
      const response = await apiAuth.post("/login", {
        email, password
      })
      const token = response.data.token
      Cookies.set("token", token)
      router.push("/private/home")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor Indisponível.")
          return
        }
        switch (erro.response?.status) {
          case 400:
            toast.error("Dado(s) inválido(s).")
            break
          case 401:
            toast.error("Email e(ou) senha icorreto(s).")
            break
          default:
            toast.error("Erro! Tente novamente.")
        }
      } else {
        toast.error("Erro inesperado")
      }
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
          <form onSubmit={handleSubmit(logarBibliotecario)}>

            <div className="input">
              <input 
                placeholder="Digite seu e-mail"
                type="email"
                { ...register("email", {
                  setValueAs: (value:string) => value.trim(),
                  required: "O e-mail é um campo obrigatório"
                }) }
                />
                { errors.email && <span className="span-erro">{errors.email.message}</span>}
            </div>

            <div className="input input-icon">
              <input 
                placeholder="Digite sua senha"
                type={visible?"text":"password"}
                { ...register("password", {
                  required: "A senha é um campo obrigatório",
                  minLength: { value: 3, message: "A senha precisar ter pelo menos 3 caracteres" }
                }) }
              />
              <i 
                onClick={()=>setVisible(!visible)} 
                className={visible?"fa-regular fa-eye-slash fa-lg":"fa-regular fa-eye fa-lg"}
              ></i>
              { errors.password && <span className="span-erro">{errors.password.message}</span>}
            </div>

            <button>Entrar</button>
          </form>
          <p>Não possui uma conta? <Link href={`/auth/cadastro`}>Cadastrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}