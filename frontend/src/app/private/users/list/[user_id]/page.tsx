'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoanInterface, UserInterface } from "@/interfaces/usersInterface"
import axios from "axios"
import { apiLoans, apiUsers } from "@/api"
import Cookies from "js-cookie"
import { toast } from "react-toastify" 
import LoanCard from "@/components/loanCard/LoanCard"
import "./user-detail.css"

export default function UserDetails() {
  const router = useRouter()
  const params = useParams()

  const [user, setUser] = useState<UserInterface>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [userLoans, setUserLoans] = useState<LoanInterface[]>([])
  const token = Cookies.get("token")
  const user_id = params.user_id

  useEffect(()=> {
    async function getUser() {
      if(!token) {
        return
      }
      try {
        const response = await apiUsers.get(`/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setUser(response.data)
        setName(response.data.name)
        setEmail(response.data.email)
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
  }, [user_id, token])

  function formatDate(date: string | Date) {
    return new Date(date).toLocaleDateString("pt-BR", {
      timeZone: "UTC"
    })
  }

  function getRemainingDays(dueDate: string | Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    const difference = due.getTime() - today.getTime();

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  }

  async function editUserProfile(e: React.FormEvent) {
    e.preventDefault()
    if(!name || !email || !user) {
      return toast.error("Preencha todos os campos")
    }
    try {
      await apiUsers.put(`/${user_id}`, {
        name, email
      })
      toast.success("Perfil atualizado")
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
            toast.error(erro.response.data.Mensagem)
            break
          default:
            toast.error("Erro! Tente novamente.")
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
      <h1>Detalhes do Usuário</h1>
      <form onSubmit={editUserProfile} className="form-post-user">
        <h2> <i className="fa-solid fa-pen-to-square"></i> Editar informações</h2>
        <input 
          placeholder="Digite o nome do usuário"
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          required
        />
        <input 
          placeholder="Digite o e-mail do usuário"
          type="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
        <button onClick={deleteUserProfile} type="button">Excluir usuário</button>
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