import { BookInterface } from "@/interfaces/usersInterface"

interface ListBooksInterface {
  books: BookInterface[]
}

export default function ListBooks({ books }: ListBooksInterface) {
  return (
    <div className="books">
      { books.length > 0 ? (
        books.map((book)=> {
          return (
            <div key={book.id} className="book">
              <h3>{book.title}</h3>
              <span></span>
            </div>
          )
        })
      ) : (
        <span className="erro">Nenhum livro cadastrado ainda</span>
      ) }
    </div>
  )
}