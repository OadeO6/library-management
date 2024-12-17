export class UserAlreadyExistsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserAlreadyExistsError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export class DonorNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DonorNotFoundError";
  }
}

export class BookNotAvailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookNotAvailableError";
  }
}

export class BookNotBorrowedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BookNotBorrowedError";
  }
}

export class TransactionFailedError extends Error {
  constructor(action: string, message: string) {
    super(`Error ${action}: ${message}`);
    this.name = "TransactionFailedError";
  }
}
