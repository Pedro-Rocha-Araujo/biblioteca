import { Router } from "express"
import { 
  getLoans, getUserLoans, getLoan, postLoan, returnLoan, deleteLoan 
} from "../controllers/loanControllers.js"
import { checkToken } from "../middlewares/userMiddlewares.js"

const loanRouter = Router()

loanRouter.get("/loans/", checkToken, getLoans)
loanRouter.get("/loans/:user_id", checkToken, getUserLoans)
loanRouter.get("/loans/:loan_id", checkToken, getLoan)
loanRouter.post("/loans", checkToken, postLoan)
loanRouter.patch("/loans/:loan_id", checkToken, returnLoan)
loanRouter.delete("/loans/:loan_id", checkToken, deleteLoan)

export default loanRouter