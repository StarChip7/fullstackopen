import { Pressable, View, TextInput } from 'react-native';
import { useFormik } from 'formik';
import useSignIn from '../hooks/useSignIn';
import Text from './Text';
import * as yup from 'yup';
import theme from '../theme';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const styles = {
  container: {
    margin: 2,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(2, 'Username must be at least 2 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit
  });
  
  return ( <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.input, { borderColor: formik.touched.username && formik.errors.username ? theme.colors.error : 'gray' }]} 
      />

      {formik.touched.username && formik.errors.username && (
        <Text color='error'>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.input, { borderColor: formik.touched.password && formik.errors.password ? theme.colors.error : 'gray' }]}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='error'>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder='Confirm Password'
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        style={[styles.input, { borderColor: formik.touched.confirmPassword && formik.errors.confirmPassword ? theme.colors.error : 'gray' }]}
        secureTextEntry
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <Text color='error'>{formik.errors.confirmPassword}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={{ backgroundColor: theme.colors.primary, padding: 10, borderRadius: 5, marginTop: 10, alignItems: 'center' }}>
        <Text color='textWhite' fontWeight='bold'>Sign Up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {

  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { username, password } });
      await signIn({ username, password });
    } catch (e) {
      console.error('Error during sign up:', e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;