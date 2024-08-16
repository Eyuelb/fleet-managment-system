import { createContext } from 'react';
import { AuthContextType, } from './auth.model';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
