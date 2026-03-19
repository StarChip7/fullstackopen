import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
  };

  return signOut;
};

export default useSignOut;