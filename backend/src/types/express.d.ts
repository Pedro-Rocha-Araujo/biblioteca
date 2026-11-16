declare global {
  namespace Express {
    interface Request {
      librarianId?: string;
    }
  }
}

export {};