import { Router } from "express"
import { deleteBook, getBook, getBooks, postBook, putBook } from "../controllers/bookControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const bookRouter = Router()

bookRouter.get("/books", checkToken, getBooks)
bookRouter.get("/books/:book_id", checkToken, getBook)
bookRouter.post("/books", checkToken, postBook)
bookRouter.put("/books/:book_id", checkToken, putBook)
bookRouter.delete("/books/:book_id", checkToken, deleteBook)

export default bookRouter