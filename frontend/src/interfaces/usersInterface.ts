export interface UserInterface {
  id: number,
  name: string,
  email: string
}

export interface BookInterface {
  id: number,
  isbn: string,
  title: string,
  author: string,
  quantity: number
}

export interface LibrarianInterface {
  id: number,
  name: string,
  email: string,
}