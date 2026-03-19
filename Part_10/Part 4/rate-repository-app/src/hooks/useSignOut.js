import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
   const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    navigate('/login');

  };

  return signOut;
};

export default useSignOut;