'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { toast } from "react-toastify"
import axios from "axios"
import { apiAuth } from "@/api"
import Cookies from "js-cookie"
import { LibrarianInterface } from "@/interfaces/usersInterface"
import "../auth.css"

export default function Cadastro() {
  const { 
    register, handleSubmit, formState: { isSubmitting, errors } 
  } = useForm<LibrarianInterface>({})

  const [visible, setVisible] = useState<boolean>(false)

  const router = useRouter()

  async function cadastrarBibliotecario(data: LibrarianInterface) {
    const { name, email, password } = data
    try {
      const response = await apiAuth.post("/register", {
        name, email, password
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
          case 409:
            toast.error("E-mail já cadastrado.")
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
          <h1><i className="fa-solid fa-circle-user"></i> Cadastro</h1>
          <form onSubmit={handleSubmit(cadastrarBibliotecario)}>

            <div className="input">
              <input 
                placeholder="Digite seu nome" 
                type="text"
                {...register("name", {
                  setValueAs: (value:string) => value.trim(),
                  required: "O campo nome é obrigatório",
                  minLength: { value: 3, message: "O nome precisa ter pelo menos 3 caracteres" }
                })}
                />
                { errors.name && <span className="span-erro">{errors.name.message}</span>}
            </div>

            <div className="input">
              <input 
                placeholder="Digite seu e-mail" 
                type="email"
                {...register("email", {
                  setValueAs: (value:string) => value.trim(),
                  required: "O campo e-mail é obrigatório",
                })}
              />
              { errors.email && <span className="span-erro">{errors.email.message}</span>}
            </div>

            <div className="input input-icon">
              <input 
                placeholder="Digite sua senha" 
                type={visible?"text":"password"}
                {...register("password", {
                  required: "O campo senha é obrigatório",
                  minLength: { value: 3, message: "A Senha precisa ter pelo menos 3 caracteres" }
                })}
              />
              <i 
                onClick={()=>setVisible(!visible)} 
                className={visible?"fa-regular fa-eye-slash fa-lg":"fa-regular fa-eye fa-lg"}
              ></i>
              { errors.password && <span className="span-erro">{errors.password.message}</span>}
            </div>

            <button>Cadastrar</button>
          </form>
          <p>Já possui uma conta? <Link href={`/auth/login`}>Entrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}