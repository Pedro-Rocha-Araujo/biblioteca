'use client'

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { LoanInterface } from "@/interfaces/usersInterface"
import axios from "axios"
import { apiLoans } from "@/api"
import { toast } from "react-toastify" 
import "./loan-detail.css"

export default function LoanDetails() {
  const router = useRouter()
  const params = useParams()

  const loan_id = params.loan_id

  const [loan, setLoan] = useState<LoanInterface>()
  
  
  
  useEffect(()=> {
    async function getLoans() {
      try {
        const response = await apiLoans(`/loan/${loan_id}`)
        setLoan(response.data)
      } catch(erro) {
        console.log(erro)
      }
    }
    getLoans()
  }, [loan_id])

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

  async function returnLoan() {
    try {
      await apiLoans.patch(`/${loan_id}`)
      router.push("/private/loans/list")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor Indisponível.")
          return
        }
        switch (erro.response?.status) {
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Recurso não encontrado.")
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

  async function deleteLoan() {
    try {
      await apiLoans.delete(`/${loan_id}`)
      router.push("/private/loans/list")
    } catch(erro) {
      if(axios.isAxiosError(erro)) {
        if (!erro.response) {
          toast.error("Servidor Indisponível.")
          return
        }
        switch (erro.response?.status) {
          case 401:
            toast.error("Faça o login novamente.")
            break
          case 404:
            toast.error("Recurso não encontrado.")
            break
          case 409:
            toast.error("Empréstimo pendente")
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
    <section className="loan-details">
      <h1>Detalhes do Empréstimo</h1>

      { loan ? (
        <div className="loan">
          <h3><strong>Usuário:</strong> {loan?.user.name}</h3>
          <span><strong>Bibliotecário:</strong> {loan?.librarian.name}</span>
          <span><strong>Livro:</strong> {loan?.book.title}</span>
          <span><strong>Data:</strong> {formatDate(loan?.loanDate)}</span>
          <div className="infos">
            <span><strong>Prazo:</strong> {formatDate(loan?.dueDate)}</span>
            <span><strong>Dias restantes:</strong> {getRemainingDays(loan?.dueDate)}</span>
          </div>
        </div>
      ) : (
        <span className="erro">Empréstimo não encontrado</span>
      ) }

      <form className="form-post-loan">
        <h2> <i className="fa-regular fa-calendar"></i> Gerenciar Empréstimo</h2>
        { !loan?.returnDate && (
          <button onClick={returnLoan} className="green" type="button">
            Realizar devolução
          </button>
        ) }
        <button onClick={deleteLoan} type="button">
          Excluir Empréstimo
        </button>
      </form>

    </section>
  )
}