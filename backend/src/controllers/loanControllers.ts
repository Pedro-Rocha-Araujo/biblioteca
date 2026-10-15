import { Request, Response } from "express"
import prisma from "../prisma.js"

export async function getLoans(_request: Request, response: Response) {
  try {
    const loans = await prisma.loan.findMany({
      where: {
        returnDate: null
      },
      include: {
        book: true,
        user: true,
        librarian: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return response.status(200).json(loans)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cuscar os empréstimos",
      Erro: erro
    })
  }
}

export async function getUserLoans(request: Request, response: Response) {
  try {
    const user_id = Number(request.params.user_id)
    if(!Number.isInteger(user_id) || user_id < 1) {
      return response.status(400).json({ Mensagem: "Id do usuário não informado ou inválido" })
    }
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    const userLoans = await prisma.loan.findMany({
      where: {
        user: {
          id: user_id
        }
      },
      include: {
        book: true,
        user: true,
        librarian: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    return response.status(200).json(userLoans)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar os empréstimos do usuário",
      Erro: erro
    })
  }
}

export async function getLoan(request: Request, response: Response) {
  try {
    const loan_id = Number(request.params.loan_id)
    if(!Number.isInteger(loan_id) || loan_id < 1) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const loan = await prisma.loan.findUnique({
      where: {
        id: loan_id
      },
      include: {
        user: true,
        book: true,
        librarian: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })
    if(!loan) {
      return response.status(404).json({ Mensagem: "Empréstimo não encontrado" })
    }
    return response.status(200).json(loan)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao buscar o empréstimo",
      Erro: erro
    })
  }
}

export async function postLoan(request: Request, response: Response) {
  try {
    const { librarianId } = request
    const { book_id, user_id } = request.body
    const loanDate = new Date()
    const dueDate = new Date(loanDate)
    dueDate.setDate(dueDate.getDate() + 15)
    if(!librarianId || !Number.isInteger(book_id) || !Number.isInteger(user_id)) {
      return response.status(400).json({ Mensagem: "Campos obrigatórios não preenchidos" })
    }
    if(librarianId < 1 || book_id < 1 || user_id < 1) {
      return response.status(400).json({ Mensagem: "Campo(s)inválido(s)" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: book_id
      }
    })
    if(!verifyBook) {
      return response.status(404).json({ Mensagem: "Livro não encontrado" })
    }
    if(verifyBook.quantity < 1) {
      return response.status(409).json({ Mensagem: "O livro em questão está esgotado!" })
    }
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    await prisma.$transaction(async (p)=> {
      await p.loan.create({
        data: {
          userId: user_id,
          bookId: book_id,
          librarianId,
          loanDate,
          dueDate
        }
      });
      await p.book.update({
        where: {
          id: book_id
        },
        data: {
          quantity: {
            decrement: 1
          }
        }
      })
    })
    return response.status(201).json({ Mensagem: "Empréstimo realizado com sucesso" })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao realizar empréstimo",
      Erro: erro
    })
  }
}

export async function returnLoan(request: Request, response: Response) {
  try {
    const loan_id = Number(request.params.loan_id)
    const returnDate = new Date()
    if(!Number.isInteger(loan_id) || loan_id < 1) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const verifyLoan = await prisma.loan.findUnique({
      where: {
        id: loan_id
      }
    })
    if(!verifyLoan) {
      return response.status(404).json({ Mensagem: "Empréstimo não encontrado" })
    }
    if(verifyLoan.returnDate) {
      return response.status(409).json({ Mensagem: "O livro já foi devolvido" })
    }
    await prisma.$transaction(async (p)=> {
      await p.loan.update({
        where: {
          id: loan_id
        },
        data: {
          returnDate
        }
      })
      await p.book.update({
        where: {
          id: verifyLoan.bookId
        },
        data: {
          quantity: { increment: 1 }
        }
      })

    })
    return response.status(200).json({ Mensagem: "Empréstimo finalizado" })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao finalizar o empréstimo",
      Erro: erro
    })
  }
}

export async function deleteLoan(request: Request, response: Response) {
  try {
    const loan_id = Number(request.params.loan_id)
    if(!Number.isInteger(loan_id) || loan_id < 1 ) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const verifyLoan = await prisma.loan.findUnique({
      where: {
        id: loan_id
      }
    })
    if(!verifyLoan) {
      return response.status(404).json({ Mensagem: "Empréstimo não encontrado" })
    }
    if(!verifyLoan.returnDate) {
      return response.status(409).json({ Mensagem: "O empréstimo não pode ser excluído pois está pendente" })
    }
    await prisma.loan.delete({
      where: {
        id: loan_id
      }
    })
    return response.status(200).json({ Mensagem: "Empréstimo deletado com sucesso" })
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao excluir empréstimo",
      Erro: erro
    })
  }
}