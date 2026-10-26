import { BookInterface } from "@/interfaces/usersInterface"

interface ListBooksInterface {
  books: BookInterface[],
  bookSelected: number | null,
  setBookSelected: (id:number)=> void
}

export default function ListBooks({ books, bookSelected, setBookSelected }: ListBooksInterface) {
  return (
    <div className="books">
      { books.length > 0 ? (
        books.map((book)=> {
          return (
            <div 
              onClick={()=>setBookSelected(book.id)}
              key={book.id} 
              className="book"
              id={book.id===bookSelected?"selected":""}
            >
              <h3>{book.title}</h3>
            </div>
          )
        })
      ) : (
        <span className="erro">Nenhum livro cadastrado ainda</span>
      ) }
    </div>
  )
}