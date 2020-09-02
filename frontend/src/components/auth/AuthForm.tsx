import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'styles';

interface FormProps {
  mode: 'login' | 'register';
  username: string;
  password: string;
  passwordConfirm?: string;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const AuthForm: React.FC<FormProps> = ({
  mode,
  username,
  password,
  passwordConfirm,
  onSubmit,
  onChange,
  onKeyPress,
}) => {
  const text = mode === 'login' ? '로그인' : '사원등록';

  return (
    <>
      <InputGroup>
        <Input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          required
        />
        <span className="bar" />
        <label>사용자 이름</label>
      </InputGroup>
      <InputGroup>
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          onKeyPress={onKeyPress}
          required
        />
        <span className="bar" />
        <label>비밀번호</label>
      </InputGroup>
      {mode === 'register' && (
        <InputGroup>
          <Input
            type="password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={onChange}
            onKeyPress={onKeyPress}
            required
          />
          <span className="bar" />
          <label>비밀번호 확인</label>
        </InputGroup>
      )}
      <Button onClick={onSubmit}>{text}</Button>
    </>
  );
};

export default AuthForm;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  label {
    position: absolute;
    color: ${oc.gray[9]};
    top: 12px;
    left: 0;
    transition: 0.2s ease all;
  }
  .bar {
    position: relative;
    display: block;
    width: 100%;
    &:before {
      content: '';
      position: absolute;
      left: 50%;
      right: 50%;
      bottom: 0;
      background: ${oc.cyan[8]};
      height: 3px;
      transition: left 0.2s ease-out, right 0.2s ease-out;
    }
  }
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${oc.cyan[6]};
  padding: 10px;
  display: block;
  width: 92%;
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: -10px;
    font-size: 14px;
    color: ${oc.teal[6]};
  }
  &:focus ~ .bar:before {
    left: 0;
    right: 0;
  }
`;

const Button = styled.button`
  background-color: ${oc.cyan[6]};
  width: 100%;
  border: none;
  margin-top: 1rem;
  padding-top: 0.6rem;
  padding-bottom: 0.5rem;
  color: white;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: 0.2s all;
  ${shadow(1)};
  &:hover {
    background-color: ${oc.cyan[5]};
    ${shadow(2)};
  }
  &:active {
    background-color: ${oc.cyan[6]};
  }
`;
