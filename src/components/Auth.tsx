import { useState } from 'react';

import { User } from '../definitions/defn';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loginUserRequested, registerUserRequested } from '../features/user-data-slice';
import { AuthContainer, Button, Input, Label, Login, Main, Signup, InvisibleCheckBox } from '../styles/auth';

const Auth = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const { loginIsPending, registerIsPending } = useAppSelector(state => state.userData)
  const [isChecked, setIsChecked] = useState(true); // check box state
  const dispatch = useAppDispatch();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = { username: signupUsername, email: signupEmail, password: signupPassword }
    dispatch(registerUserRequested({ user }))
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email: loginEmail, password: loginPassword }
    dispatch(loginUserRequested({ user }))
  };

  return (
    <AuthContainer>
      <Main>
        <InvisibleCheckBox type="checkbox" id="chk" aria-hidden onChange={() => setIsChecked(!isChecked)} />
        <Signup isChecked={isChecked}>
          <form onSubmit={handleSignUp}>
            <Label htmlFor="chk" aria-hidden>Sign up</Label>
            <Input type="text" placeholder="User name" onChange={event => setSignupUsername(event.target.value)} required />
            <Input type="email" placeholder="Email" onChange={event => setSignupEmail(event.target.value)} required />
            <Input type="password" placeholder="Password" onChange={event => setSignupPassword(event.target.value)} required />
            <Button type="submit" isPending={registerIsPending || loginIsPending} disabled={registerIsPending || loginIsPending}>{registerIsPending ? 'wait...' : 'Sign up'}</Button>
          </form>
        </Signup>
        <Login isChecked={isChecked}>
          <form onSubmit={handleLogin}>
            <Label htmlFor="chk" aria-hidden>Login</Label>
            <Input type="email" placeholder="Email" onChange={event => setLoginEmail(event.target.value)} required />
            <Input type="password" placeholder="Password" onChange={event => setLoginPassword(event.target.value)} required />
            <Button type="submit" isPending={loginIsPending || registerIsPending} disabled={loginIsPending || registerIsPending}>{loginIsPending ? 'wait...' : 'Login'}</Button>
          </form>
        </Login>
      </Main>
    </AuthContainer>
  );
}

export default Auth;