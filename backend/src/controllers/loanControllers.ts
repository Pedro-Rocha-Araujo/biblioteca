import { Request, Response } from "express"
import { uuidSchema } from "../schemas/uuidSchema.js"
import prisma from "../prisma.js"

async function updateOverDueLoans() {
  const today = new Date()
  await prisma.loan.updateMany({
    where: {
      returnDate: null,
      dueDate: {
        lt: today
      },
      status: "ON_TIME"
    },
    data: {
      status: "OVERDUE"
    }
  })
}

export async function getLoans(_request: Request, response: Response) {
  try {
    await updateOverDueLoans()
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

export async function getOverDueLoans(_request: Request, response: Response) {
  try {
    await updateOverDueLoans()
    const today = new Date()
    const loans = await prisma.loan.findMany({
      where: {
        returnDate: null,
        dueDate: {
          lt: today
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
    return response.status(200).json(loans)
  } catch(erro) {
    return response.status(500).json({
      Mensagem: "Erro ao cuscar os empréstimos vencidos",
      Erro: erro
    })
  }
}

export async function getUserLoans(request: Request, response: Response) {
  try {
    await updateOverDueLoans()
    const { user_id } = request.params
    const result = uuidSchema.safeParse(user_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do usuário não informado ou inválido" })
    }
    const verifyUser = await prisma.user.findUnique({
      where: {
        id: result.data
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    const userLoans = await prisma.loan.findMany({
      where: {
        user: {
          id: result.data
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
    await updateOverDueLoans()
    const { loan_id } = request.params
    const result = uuidSchema.safeParse(loan_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const loan = await prisma.loan.findUnique({
      where: {
        id: result.data
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
    const result_librarian = uuidSchema.safeParse(librarianId)
    const { book_id } = request.body
    const result_book = uuidSchema.safeParse(book_id)
    const { user_id } = request.body
    const result_user = uuidSchema.safeParse(user_id)
    if(!result_librarian.success || !result_book.success || !result_user.success) {
      return response.status(400).json({ Mensagem: "Campos obrigatórios não enviados ou inválidos" })
    }

    const loanDate = new Date()
    const dueDate = new Date(loanDate)
    dueDate.setDate(dueDate.getDate() + 15)

    const verifyLibrarian = await prisma.librarian.findUnique({
      where: {
        id: result_librarian.data
      }
    })
    if(!verifyLibrarian) {
      return response.status(404).json({ Mensagem: "Bibliotecário não encontrado" })
    }
    const verifyBook = await prisma.book.findUnique({
      where: {
        id: result_book.data
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
        id: result_user.data
      }
    })
    if(!verifyUser) {
      return response.status(404).json({ Mensagem: "Usuário não encontrado" })
    }
    await prisma.$transaction(async (p)=> {
      await p.loan.create({
        data: {
          userId: result_user.data,
          bookId: result_book.data,
          librarianId: result_librarian.data,
          loanDate,
          dueDate
        }
      });
      await p.book.update({
        where: {
          id: result_book.data,
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
      Mensagem: "Erro ao realizar empréstimo"
    })
  }
}

export async function returnLoan(request: Request, response: Response) {
  try {
    const { loan_id } = request.params
    const result = uuidSchema.safeParse(loan_id)
    const returnDate = new Date()
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const verifyLoan = await prisma.loan.findUnique({
      where: {
        id: result.data
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
          id: result.data
        },
        data: {
          returnDate,
          status: "RETURNED"
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
    const { loan_id } = request.params
    const result = uuidSchema.safeParse(loan_id)
    if(!result.success) {
      return response.status(400).json({ Mensagem: "Id do empréstimo não informado ou inválido" })
    }
    const verifyLoan = await prisma.loan.findUnique({
      where: {
        id: result.data
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
        id: result.data
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