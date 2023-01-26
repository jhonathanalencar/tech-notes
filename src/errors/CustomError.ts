class CustomError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
  }
}

export { CustomError };
