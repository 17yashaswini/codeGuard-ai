import { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth } from '@clerk/react';
import axiosInstance from '../lib/axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      syncUser();
    }
  }, [isLoaded, user]);

  const syncUser = async () => {
    try {
      const token = await getToken();
      const res = await axiosInstance.post('/api/user/sync', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredits(res.data.user.credits);
    } catch (error) {
      console.error('Sync error:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshCredits = async () => {
    try {
      const token = await getToken();
      const res = await axiosInstance.get('/api/user/credits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCredits(res.data.credits);
    } catch (error) {
      console.error('Credits error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ credits, loading, refreshCredits }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);