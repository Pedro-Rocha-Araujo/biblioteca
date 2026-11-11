import { useRouter } from "next/navigation"
import "./header.css"

interface HeaderProps {
  title: string,
  icon: string
}

export default function Header({ title, icon }: HeaderProps) {
  const router = useRouter() 
  return (
    <header className="navegacao">
      <h1 onClick={()=>router.push("/private/home")}><i className={icon}></i> {title}</h1>
    </header>
  )
}