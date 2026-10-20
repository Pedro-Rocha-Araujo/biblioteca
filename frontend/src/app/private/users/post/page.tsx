import "./post-user.css"

export default function PostUser() {
  return (
    <section className="post-user">
      <h1> <i className="fa-solid fa-circle-plus"></i> Cadastrar Usuário</h1>

      <form className="form-post-user">
        <input 
          placeholder="Digite o nome do usuário"
          type="text"
        />
        <input 
          placeholder="Digite seu e-mail"
          type="email"
        />
        <button>Cadastrar</button>
      </form>
    </section>
  )
}