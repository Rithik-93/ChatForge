/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      firstName: string;
      lastName: string?;
      password: string?;
      avatar: string?;
    }
  }
}

export {};
