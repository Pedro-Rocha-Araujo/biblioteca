declare global {
  namespace Express {
    interface Request {
      librarianId?: number;
    }
  }
}

export {};