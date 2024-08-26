import styled from "@emotion/styled";
import { space, layout, typography, color } from "styled-system";
import { Link } from 'react-router-dom';

const FormContainer = styled.div`
  max-width: 600px;
  background: #fff;
  padding: 15px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  margin-top: 30vh;
`;

const FormLabel = styled.h2`
  text-align: left;
  padding-left: 30px;
  font-size: 32px;
  font-weight: 600;
  color: goldenrod;
  ${typography}
`;

const Form = styled.form`
  ${space}
`;

const FormRow = styled.div`
  display: flex;
  margin: 32px 0;
  ${layout}
`;

const InputData = styled.div`
  width: 100%;
  height: 40px;
  margin: 0 30px;
  position: relative;
  ${layout}
`;

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 18px;
  padding: 0 5px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.12);
  &:focus ~ label,
  &:valid ~ label {
    transform: translateY(-32px);
    font-size: 14px;
    color: #3498db;
  }
  ${typography}
`;

const Label = styled.label`
  position: absolute;
  pointer-events: none;
  bottom: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  ${typography}
`;

const Underline = styled.div`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 100%;
  &:before {
    position: absolute;
    content: "";
    height: 2px;
    width: 100%;
    background: #3498db;
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.3s ease;
  }
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 95%;
  ${space}
`;

const StyledLink = styled(Link)`
  ${typography}
  ${color}
  ${space}
  ${layout}
  padding: 5px 15px;
  background-color: #f56565;
  color: white;
  text-align: center;
  border-radius: 8px;
  text-decoration: none;
  &:hover {
    background-color: #c53030;
  }
`;

const StyledButton = styled.button`
  ${typography}
  ${color}
  ${space}
  ${layout}
  padding: 5px 15px;
  background-color: #4299e1;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #2b6cb0;
  }
`;


export {
  FormContainer,
  FormLabel,
  Form,
  FormRow,
  InputData,
  Input,
  Label,
  Underline,
  ButtonContainer,
  StyledLink,
  StyledButton
};