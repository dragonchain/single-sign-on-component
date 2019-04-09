
export class TOKEN_INVALID extends Error {
  constructor() {
    super();
    this.code = 'TOKEN_INVALID';
    this.userMessage = 'Your token is invalid. Please login.';
  }
}

export class UNAUTHORIZED extends Error {
  constructor() {
    super();
    this.code = 'UNAUTHORIZED';
    this.userMessage = 'Please log-in to perform that action.';
  }
}

export class NOT_FOUND extends Error {
  constructor() {
    super();
    this.code = 'NOT_FOUND';
    this.userMessage = 'The requested resource could not be found.';
  }
}

export class GENERIC_ERROR extends Error {
  constructor(message) {
    super();
    this.code = 'GENERIC_ERROR';
    this.userMessage = message || 'Something went wrong. Please try again later.';
  }
}
