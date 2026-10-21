import "./list.css"

export default function ListUsers() {
  return (
    <section className="list">

      <div className="heading">
        <h1> <i className="fa-solid fa-address-book"></i> Usuários</h1>
        <div className="pesquisa">
          <input 
            placeholder="Pesquisar"
            type="text"
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      
      
      <div className="users">

        <div className="user">
          <h3>Nome do usuário da silva</h3>
          <i className="fa-solid fa-eye fa-lg"></i>
        </div>

        <div className="user">
          <h3>Nome do usuário da silva</h3>
          <i className="fa-solid fa-eye fa-lg"></i>
        </div>

        <div className="user">
          <h3>Nome do usuário da silva</h3>
          <i className="fa-solid fa-eye fa-lg"></i>
        </div>

        <div className="user">
          <h3>Nome do usuário da silva</h3>
          <i className="fa-solid fa-eye fa-lg"></i>
        </div>

      </div>
    </section>
  )
}