import "./books.css"

export default function Books() {
  return (
    <section className="books">
      <h1> <i className="fa-solid fa-book"></i> Livros</h1>
      <nav className="navegacao">
        <button className="green">Livros cadastrados</button>
        <button className="yellow">Cadastrar Livro</button>
      </nav>
    </section>
  )
}