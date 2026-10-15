import express from "express"
import cors from "cors"
import bookRouter from "./routes/bookRoutes.js"
import userRouter from "./routes/userRoutes.js"
import librarianRouter from "./routes/librarianRoutes.js"
import loanRouter from "./routes/loanRoutes.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use(bookRouter)
app.use(userRouter)
app.use(librarianRouter)
app.use(loanRouter)

app.listen(4000, ()=> console.log("Servidor rodando!"))