import "./profile.css"

export default function Profile() {
  return (
    <section className="profile">
      <h1> <i className="fa-solid fa-circle-user"></i> Perfil</h1>

      <form className="update-user-profile">
        <input 
          placeholder="Digite seu nome"
          value={"Pedro Rocha Araujo"}
          type="text"
        />
        <input 
          placeholder="Digite seu e-mail"
          value={"pedro@pedro.com"}
          type="email"
        />
        <button>Salvar alterações</button>
      </form>
    </section>
  )
}