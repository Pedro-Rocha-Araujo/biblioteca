import "./loans.css"

export default function Loans() {
  return (
    <section className="loans">
      <h1> <i className="fa-solid fa-handshake"></i> Empréstimos</h1>
      <nav className="navegacao">
        <button className="green">Empréstimos em aberto</button>
        <button className="yellow">Cadastrar empréstimo</button>
      </nav>
    </section>
  )
}