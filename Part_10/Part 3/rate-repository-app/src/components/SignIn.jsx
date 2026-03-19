import { Pressable, View, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import Text from './Text';
import * as yup from 'yup';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

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
});

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { username, password } = values;

      try {
        await signIn({ username, password });
        navigate('/');
        
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.input, { borderColor: formik.touched.username && formik.errors.username ? theme.colors.error : 'gray' }]} 
      />

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={[styles.input, { borderColor: formik.touched.password && formik.errors.password ? theme.colors.error : 'gray' }]}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error }}>{formik.errors.password}</Text>
      )}
      <Pressable
        onPress={formik.handleSubmit}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          alignItems: 'center',
          marginTop: 10,
        }}
      >
        <Text>Sign In</Text>
      </Pressable>
    </View>
  );
  

};

export default SignIn;