import { SupabaseRow } from "../supabase/types/supabase.types";

export interface User {
  email: string;
  username: string;
  avatarUrl: string;
}

export type UserDoc = SupabaseRow<User>;

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
