/* eslint-disable no-unused-vars */
declare global {
  namespace Express {
    interface User {
      id: string;
      email: string;
      name: string;
      password: string?;
      avatar: string?;
    }
  }
}

export {};
