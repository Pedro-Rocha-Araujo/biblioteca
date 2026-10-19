import { useRouter } from "next/navigation"

interface NavElementProps {
  icon: string,
  label: string,
  link?: string
}

export default function NavElement({ icon, label, link }: NavElementProps) {
  const router = useRouter()
  return (
    <div onClick={()=>link&&router.push(link)} className="nav-element">
      <i className={icon}></i>
      <label>{label}</label>
    </div>
  )
}