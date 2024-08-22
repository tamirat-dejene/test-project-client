import styled from "@emotion/styled";
import { space, color, typography, TypographyProps } from "styled-system";

const TableContainer = styled.div`
  width: 89vw;
  margin: 0 auto;
  border: none;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  text-align: left;

  margin-bottom: 20px;

  thead {
    position: sticky;
    top: 0;
    background-color: #333;
    color: white;
    z-index: 1;
  }
`;

const Thead = styled.thead`
  & > tr:hover {
    background-color: inherit;
  }
`;
const Tbody = styled.tbody``;

const Tr = styled.tr`
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #747264;
    border-radius: 15px;
  }
`;

const Th = styled.th`
  padding: 12px 15px;
`;

const Td = styled.td`
  padding: 7px 12px;
  vertical-align: middle;
`;

const Button = styled.button<TypographyProps>`
  ${typography}
  ${space}
  ${color}
  cursor: pointer;
  background-color: #333;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 7px 10px;
  margin-right: 5px;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }

  ${({ color }) =>
    color === "red" &&
    `
    background-color: #DC5F00;
    &:hover {
      background-color: darkred;
    }
  `}
`;

const Actions = styled.div`
  display: flex;
  gap: 15px;
`;


export {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Actions,
};