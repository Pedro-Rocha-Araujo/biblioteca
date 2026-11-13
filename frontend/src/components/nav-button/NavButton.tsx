'use client'

import { useRouter } from "next/navigation"
import "./nav-button.css" 

interface NavButtonInterface {
  color: "red" | "green" | "blue" | "yellow",
  icon: string
  text: string,
  path: string
}

export default function NavButton({ color, icon, text, path }: NavButtonInterface) {
  const router = useRouter()

  return (
    <button onClick={()=>router.push(path)} id={color} className="navegacao">
      <div className="icon">
        <i className={icon}></i> 
      </div>
      <span>{text}</span>
    </button>
  )
}