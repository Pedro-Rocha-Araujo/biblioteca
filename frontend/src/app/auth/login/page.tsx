'use client'

import Link from "next/link"
import "../auth.css"

export default function Cadastro() {

  function logarBibliotecario(e:React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email")
      const password = formData.get("password")
      console.log(email, password)
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
          <h1>Login</h1>
          <form onSubmit={logarBibliotecario}>
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
            <button>Entrar</button>
          </form>
          <p>Não possui uma conta? <Link href={`/auth/cadastro`}>Cadastrar</Link>.</p>
        </div>

      </div>

    </div>
  )
}