import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { space, layout, color, typography, border } from "styled-system";

const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Main = styled.div`
  ${layout}
  ${space}
  ${color}
  ${border}
  width: 400px;
  height: 500px;
  background: red;
  overflow: hidden;
  background: inherit;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
`;

const InvisibleCheckBox = styled.input`
  ${layout}
  ${space}
  ${border}
  display: none;
`;

const Signup = styled.div<{ isChecked: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;

  ${({ isChecked }) =>
    isChecked &&
    css`
      Label {
        transform: scale(0.6);
      }
    `}
`;

const Login = styled.div<{ isChecked: boolean }>`
  ${layout}
  ${border}
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;

  Label {
    color: #000;
    transform: scale(.6);
  }

  ${({ isChecked }) =>
    isChecked &&
    css`
      transform: translateY(-500px);
      Label {
        transform: scale(1);
      }
    `}
`;

const Label = styled.label`
  ${typography}
  ${space}
  color: #fff;
  font-size: 2.3em;
  display: flex;
  justify-content: center;
  margin: 50px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
`;

const Input = styled.input`
  ${layout}
  ${space}
  ${border}
  width: 60%;
  height: 25px;
  background: #e0dede;
  display: flex;
  justify-content: center;
  margin: 20px auto;
  padding: 20px 7px;
  border: none;
  outline: none;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s ease-in-out, background 0.3s ease-in-out;

  &:focus {
    border-color: goldenrod;
    background: #fff;
  }
`;

const Button = styled.button<{ isPending: boolean }>`
  ${layout}
  ${space}
  ${typography}
  width: 60%;
  height: 40px;
  margin: 10px auto;
  display: block;
  justify-content: center;
  color: #fff;
  background: #07a2f5;
  font-size: 1em;
  font-weight: bold;
  margin-top: 30px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;

  ${({ isPending }) =>
    isPending &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}

  &:hover {
    background: #0d8de4;
  }
`;

export { AuthContainer, Main, Signup, Login, Label, Input, Button, InvisibleCheckBox };