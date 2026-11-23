export interface UserInterface {
  id: number,
  name: string,
  email: string,
  phone: string,
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
  password: string
}

export interface LoanInterface {
  id: number,
  book: BookInterface,
  librarian: LibrarianInterface,
  user: UserInterface,
  status: "ON_TIME" | "RETURNED" | "OVERDUE",
  loanDate: Date,
  dueDate: Date
  returnDate: Date,
}