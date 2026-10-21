import "./user-detail.css"

export default function UserDetails() {
  return (
    <section className="user-details">
      <h1>Detalhes do Usuário</h1>
      <form className="form-post-user">
        <h2> <i className="fa-solid fa-pen-to-square"></i> Editar informações</h2>
        <input 
          placeholder="Digite o nome do usuário"
          type="text"
          required
        />
        <input 
          placeholder="Digite o e-mail do usuário"
          type="email"
          required
        />
        <button type="submit">Salvar</button>
        <button type="button">Excluir usuário</button>
      </form>
      <h2> <i className="fa-regular fa-calendar"></i> Histórico de empréstimos</h2>
      <div className="loans">

        <div className="loan">
          <h3> <i className="fa-solid fa-book"></i> Livro: Nome do Livro</h3>
          <div className="infos">
            <span><strong>Empréstimo:</strong> 23/02/2005</span>
            <span><strong>Retorno:</strong> 23/02/2005</span>
          </div>
        </div>  

      </div>
    </section>
  )
}