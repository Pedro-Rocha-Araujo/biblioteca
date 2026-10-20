import "./users.css"

export default function Books() {
  return (
    <section className="users">
      <h1> <i className="fa-solid fa-user"></i> Usuários</h1>
      <nav className="navegacao">
        <button className="green">Usuários cadastrados</button>
        <button className="yellow">Cadastrar Usuário</button>
      </nav>
    </section>
  )
}