export interface User {
  email: string;
  username: string;
}

export type UserDoc = User & { id: string };

// Forms
export type UserRegister = {
  email: string;
  username: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
