import { useContext } from 'react';
import { AuthContext } from './auth.context';
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
export const useAuthSession = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthSession must be used within an AuthProvider');
  }
  return context.session;
};

export const useAuthUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthUser must be used within an AuthProvider');
  }
  return context.session.user;
};
