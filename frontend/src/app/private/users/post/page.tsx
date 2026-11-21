'use client'

import { toast } from "react-toastify"
import axios from "axios"
import { apiUsers } from "@/api"
import { useForm, useController } from "react-hook-form"
import { UserInterface } from "@/interfaces/usersInterface"
import { usePhoneMask } from "@/masks"
import "@/app/form-style.css"
import "./post-user.css"
import Header from "@/components/header/Header"

export default function PostUser() {
  const { 
    register, handleSubmit, control, reset, formState: { isSubmitting, errors }
  } = useForm<UserInterface>({ defaultValues: { name: "", email: "",  phone: "" } })

  const { field: phoneField } = useController({
    name: "phone",
    control,
    rules: {
      required: "Informe o telefone do usuário",
      minLength: {value: 16, message: "O telefone precisa ter 16 dígitos"},
      maxLength: {value: 16, message: "O telefone precisa ter 16 dígitos"}
    }
  })

  const phoneMask = usePhoneMask()

  async function postUser(data: UserInterface) {
    const { name, email, phone } = data
    try {
      await apiUsers.post("/",{ name, email, phone })
      reset()
      toast.success("Usuário(a) cadastrado(a)")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Não foi possível conectar ao servidor.")
          return
        }
        switch (erro.response?.status) {
          case 400:
            toast.error("Dado(s) inválido(s).")
            break
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Usuário não encontrado")
            break
          case 409:
            toast.error("E-mail já cadastrado")
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
    <section className="post-user">
      <Header 
        icon="fa-solid fa-circle-plus"
        title="Cadastrar Usuário"
      />

      <form onSubmit={handleSubmit(postUser)} className="post">

        <div className="input">
          <label htmlFor="nome">Nome do Usuário:</label>
          <input 
            type="text"
            {...register("name", {
              setValueAs: (value:string)=> value.trim(),
              required: "Informe o nome do usuário",
              minLength: { value: 2, message: "O nome precisa ter pelo menos 2 caracteres" },
            })}
            id="nome"
          />
          { errors.name && <span className="span-erro">{errors.name.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="email">Email do Usuário:</label>
          <input 
            type="email"
            {...register("email", {
              setValueAs: (value:String)=> value.trim(),
              required: "Informe o e-mail do usuário",
            })}
            id="email"
          />
          { errors.email && <span className="span-erro">{errors.email.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="telefone">Telefone do Usuário:</label>
          <input 
            type="text"
            {...phoneField}
            ref={phoneMask}
            id="telefone"
          />
          { errors.phone && <span className="span-erro">{errors.phone.message}</span>}
        </div>

        <button disabled={isSubmitting} >
          {isSubmitting?"Carregando":"Cadastrar"}
        </button>

      </form>
    </section>
  )
}