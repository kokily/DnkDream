import React, { useReducer, MouseEvent } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from 'graphql/auth.queries';
import { LOGIN_CONFIRM } from 'graphql/cache.local';
import AuthForm from 'components/auth/AuthForm';
import { toast } from 'react-toastify';

interface StateProps {
  username: string;
  password: string;
}

const reducer = (state: StateProps, action: any) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

const LoginContainer = () => {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
  });
  const { username, password } = state;
  const [LoginUser] = useMutation(LOGIN_USER);
  const [LoginConfirm] = useMutation(LOGIN_CONFIRM);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(e.target);
  };

  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const { data } = await LoginUser({
        variables: { username, password },
      });

      if (data.LoginUser.error) {
        toast.error(`${data.LoginUser.error}`);
        return;
      }

      const token = data.LoginUser.token;

      if (!token) {
        toast.error('토큰 발행 실패');
      }

      const response = await LoginConfirm({ variables: { token } });

      if (!response) return;

      toast.success(`${username}님 로그인`);
      window.location.href = '/';
    } catch (err) {
      toast.error(err);
    }
  };

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // @ts-ignore
      onSubmit(e);
    }
  };

  return (
    <AuthForm
      mode="login"
      username={username}
      password={password}
      onSubmit={onSubmit}
      onChange={onChange}
      onKeyPress={onKeyPress}
    />
  );
};

export default LoginContainer;
