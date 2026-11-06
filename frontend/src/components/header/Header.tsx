import "./header.css"

interface HeaderProps {
  title: string,
  icon: string
}

export default function Header({ title, icon }: HeaderProps) {
  return (
    <header className="navegacao">
      <h1><i className={icon}></i> {title}</h1>
    </header>
  )
}