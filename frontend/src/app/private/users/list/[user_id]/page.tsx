'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoanInterface, UserInterface } from "@/interfaces/usersInterface"
import axios from "axios"
import { apiLoans, apiUsers } from "@/api"
import { useForm, useController } from "react-hook-form"
import { toast } from "react-toastify" 
import LoanCard from "@/components/loanCard/LoanCard"
import { usePhoneMask } from "@/masks" 
import "@/app/form-style.css"
import "./user-detail.css"
import Header from "@/components/header/Header"

export default function UserDetails() {
  const { 
    register, handleSubmit, control, reset, formState: { isSubmitting, errors  } 
  } = useForm<UserInterface>({ defaultValues: { name: "", email: "", phone: "" } })

  const { field: phoneField } = useController({
      name: "phone",
      control,
      rules: {
        required: "Informe o telefone do usuário",
        minLength: {value: 16, message: "O telefone precisa ter 16 dígitos"},
        maxLength: {value: 16, message: "O telefone precisa ter 16 dígitos"}
      }
    })

  const router = useRouter()
  const params = useParams()
  const phoneMask = usePhoneMask()

  const [userLoans, setUserLoans] = useState<LoanInterface[]>([])

  const user_id = params.user_id

  useEffect(()=> {
    async function getUser() {
      try {
        const response = await apiUsers.get(`/${user_id}`)
        reset({
          name: response.data.name ?? "",
          email: response.data.email ?? "",
          phone: response.data.phone ?? ""
        })
      } catch(erro) {
        console.log(erro)
      }
    }
    async function getUserLoans() {
      try {
        const response = await apiLoans.get(`/${user_id}`)
        setUserLoans(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getUser()
    getUserLoans()
  }, [])

  async function editUserProfile(data: UserInterface) {
    const { name, email, phone } = data
    try {
      await apiUsers.put(`/${user_id}`, {
        name, email, phone
      })
      toast.success("Perfil atualizado")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor indisponível")
          return
        }
        switch (erro.response?.status) {
          case 400:
            toast.error("Dado(s) inválido(s)")
            break
          case 401:
            toast.error("Faça o login novamente")
            break
          case 404:
            toast.error("Usuário não encontrado")
            break
          case 409:
            toast.error("E-mail já usado")
            break
          default:
            toast.error("Erro! Tente novamente")
        }
      } else {
        toast.error("Erro inesperado")
      }
    }
  }

  async function deleteUserProfile() {
    if(!user_id) {
      toast.error("Usuário não encontrado")
    }
    try {
      await apiUsers.delete(`/${user_id}`)
      router.push("/private/users/list")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Não foi possível conectar ao servidor.")
          return
        }
        switch (erro.response?.status) {
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Usuário não encontrado.")
            break
          case 409:
            toast.error("O usuário possui pendências")
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
    <section className="user-details">
      <Header 
        icon="fa-solid fa-circle-info"
        title="Detalhes do Usuário"
      />

      <h2> <i className="fa-solid fa-pen-to-square"></i> Editar informações</h2>
      <form onSubmit={handleSubmit(editUserProfile)} className="post">

        <div className="input">
          <label htmlFor="nome">Nome do Usuário:</label>
          <input 
            type="text"
            { ...register("name", {
              setValueAs: (value:string) => value.trim(),
              minLength: {value: 2, message: "O nome precisa ter pelo menos 2 caracteres"}
            }) }
            id="nome"
          />
          { errors.name && <span className="span-erro">{errors.name.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="email">E-mail do Usuário</label>
          <input 
            type="email"
            { ...register("email") }
            id="email"
          />
          { errors.email && <span className="span-erro">{errors.email.message}</span>}
        </div>

        <div className="input">
          <label htmlFor="email">Telefone do Usuário</label>
          <input 
            type="text"
            { ...phoneField }
            ref={phoneMask}
            id="telefone"
          />
          { errors.phone && <span className="span-erro">{errors.phone.message}</span>}
        </div>
        
        <button disabled={isSubmitting} id="blue" type="submit">
          {isSubmitting?"Salvando":"Salvar"}
        </button>

        <button id="red" onClick={deleteUserProfile} type="button">
          Excluir usuário
        </button>

      </form>

      <h2> <i className="fa-regular fa-calendar"></i> Histórico de empréstimos</h2>
      <div className="loans">
        { userLoans.length > 0 ? (
          userLoans.map((loan)=> {
            return (
              <LoanCard 
                key={loan.id}
                loan={loan}
              />
            )
          })
        ) : (
          <span className="erro">O usuário não possui empéstimos</span>
        ) }

      </div>
    </section>
  )
}