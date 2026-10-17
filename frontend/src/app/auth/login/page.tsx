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
          <h1>Login</h1>
          <form>
            <input 
              placeholder="Digite seu e-mail"
              required
            />
            <input 
              placeholder="Digite sua senha"
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