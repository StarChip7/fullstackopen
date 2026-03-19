import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [mutate, result] = useMutation(AUTHENTICATE, {
    onError: (error) => {
      console.error('Authentication error:', error);
    },
  });

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    const { data } = await mutate({ variables: { username, password } });
    // store the access token in the auth storage
    await authStorage.setAccessToken(data.authenticate.accessToken);
    client.resetStore();
    navigate('/');
  };

  return [signIn, result];
};

export default useSignIn;