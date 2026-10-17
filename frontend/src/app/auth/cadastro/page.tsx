'use client'

import Link from "next/link"
import "../auth.css"

export default function Cadastro() {

  function cadastrarBibliotecario(e:React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      try {
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name")
        const email = formData.get("email")
        const password = formData.get("password")
        console.log(name, email, password)
      } catch(erro) {
        console.log(erro)
      }
    }

  return (
    <div className="auth-background">

      <div className="auth">

        <div className="div-image">
          <img 
            src={`/prateleira-login.jpg`}
          />
        </div>

        <div className="auth-form">
          <h1>Cadastro</h1>
          <form onSubmit={cadastrarBibliotecario}>
            <input 
              placeholder="Digite seu nome"
              type="text"
              name="name"
              required
            />
            <input 
              placeholder="Digite seu e-mail"
              type="text"
              name="email"
              required
            />
            <input 
              placeholder="Digite sua senha"
              type="password"
              name="password"
              required
            />
            <button>Cadastrar</button>
          </form>
          <p>Já possui uma conta? <Link href={`/auth/login`}>Entrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}