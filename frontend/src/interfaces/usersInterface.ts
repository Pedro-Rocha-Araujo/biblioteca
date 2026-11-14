export interface UserInterface {
  id: number,
  name: string,
  email: string,
  totalLoans: number
}

export interface BookInterface {
  id: number,
  isbn: string,
  title: string,
  author: string,
  genre: string,
  quantity: number
}

export interface LibrarianInterface {
  id: number,
  name: string,
  email: string,
}

export interface LoanInterface {
  id: number,
  book: BookInterface,
  librarian: LibrarianInterface,
  user: UserInterface,
  loanDate: Date,
  dueDate: Date
  returnDate: Date,

}