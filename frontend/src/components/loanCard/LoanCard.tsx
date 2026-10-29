'use client'

import { useRouter } from "next/navigation" 
import { LoanInterface } from "@/interfaces/usersInterface" 
import "./loan-card.css"

interface LoanCardProps {
  loan: LoanInterface
}

export default function LoanCard({ loan }: LoanCardProps) {
  const router = useRouter()

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

  return (
    <div key={loan.id} onClick={()=>router.push(`/private/loans/list/${loan.id}`)} className="loan">
      <h3><strong>Usuário:</strong> {loan.user.name}</h3>
      <span><strong>Bibliotecário:</strong> {loan.librarian.name}</span>
      <span><strong>Livro:</strong> {loan.book.title}</span>
      <span><strong>Data:</strong> {formatDate(loan.loanDate)}</span>
      <div className="infos">
        <span><strong>Prazo:</strong> {formatDate(loan?.dueDate)}</span>
        { loan.returnDate ? (
          <span><strong>Retorno:</strong> {formatDate(loan?.returnDate)}</span>
        ) : (
          <span><strong>Dias restantes:</strong> {getRemainingDays(loan?.dueDate)}</span>
        ) }
      </div>
      <i className="fa-solid fa-eye fa-lg"></i>
    </div>
  )
}