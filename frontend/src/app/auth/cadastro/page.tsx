import Link from "next/link"
import "../auth.css"

export default function Cadastro() {
  return (
    <div className="auth-background">

      <div className="auth">

        <div className="div-image">
          <img 
            src={`/prateleira-login.jpg`}
          />
        </div>

        <div className="auth-form">
          <h1>Cadastrar-se</h1>
          <form>
            <input 
              placeholder="Digite seu nome"
              required
            />
            <input 
              placeholder="Digite seu e-mail"
              required
            />
            <input 
              placeholder="Digite sua senha"
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