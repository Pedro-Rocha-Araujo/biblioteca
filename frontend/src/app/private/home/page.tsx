import "./home.css"

export default function Home() {
  return (
    <section className="home">
      <h1> <i className="fa-solid fa-home"></i> Home!</h1>
      <div className="buttons">
        <button className="red">Livros em falta</button>
        <button className="yellow">Empréstimos vencidos</button>
        <button className="green">Realizar empréstimo</button>
        <button className="blue">Ranking de leitores</button>
      </div>
    </section>
  );
}
