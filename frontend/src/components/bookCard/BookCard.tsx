'use client'

import { useRouter } from "next/navigation" 
import { BookInterface } from "@/interfaces/usersInterface" 

interface BookCardProps {
  book: BookInterface
}

export default function BookCard({ book }: BookCardProps) {
  const router = useRouter()
  return (
    <div onClick={()=> router.push("/private/books/list/"+book.id)} key={book.id} className="book">
      <h3>{book.title}</h3>
      <i className="fa-solid fa-eye fa-lg"></i>
    </div>
  )
}