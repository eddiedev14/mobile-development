import { FirestoreDoc } from "../firebase/types/firestore.types";

export interface User {
  email: string;
  username: string;
}

export type UserDoc = FirestoreDoc<User>;

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
