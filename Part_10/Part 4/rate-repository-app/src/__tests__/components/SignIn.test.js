import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { SignInContainer } from '../../components/SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button4
      const onSubmit = jest.fn();
      const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmit} />);
      
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign In');

      fireEvent.changeText(usernameInput, 'testuser');
      fireEvent.changeText(passwordInput, 'testpassword');
      fireEvent.press(submitButton);

      await waitFor(() => {
        // expect the onSubmit function to have been called once and with a correct first argument
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: 'testuser',
          password: 'testpassword',
        });
      });
    });
  });
});