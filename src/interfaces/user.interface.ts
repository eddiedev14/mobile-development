import { FirestoreDoc } from '../firebase/types/firestore.types';
import type { MissionProgress } from './mission.interface';

export interface User {
  email: string;
  username: string;
  points?: number;
  missions?: MissionProgress[];
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
