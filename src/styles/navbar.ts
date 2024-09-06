import styled from "@emotion/styled";
import { space, layout, color, typography, SpaceProps, LayoutProps, ColorProps, TypographyProps } from "styled-system";
import { NavLink } from "react-router-dom";
type ButtonProps = SpaceProps & LayoutProps & ColorProps & TypographyProps;

const Header = styled.header<{height: string}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 2px;
  background: inherit;
  color: white;
  height: ${props => props.height};
  width: 90vw;
  margin: 0 auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;

  @media (max-width: 768px) {
    height: ${props => props.height === '30vh' ? '35vh' : '20vh'};
  }
`;

const Logo = styled.div<TypographyProps>`
  ${typography}
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  user-select: none;

  h1 {
    font-size: 2rem;
  }

  svg {
    min-width: 50px;
    min-height: 50px;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 5px;

    h1 {
      font-size: 1rem;
    } 
      
    svg {
      min-width: 30px;
      min-height: 30px;
    }
  }
`;

const Button = styled.button<ButtonProps>`
  ${space}
  ${layout}
  ${color}
  ${typography}
  cursor: pointer;
  background-color: #45474B;
  border: none;
  border-radius: 5px;
  color: white;
  padding: 7px 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  width: 150px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  &:hover {
    background-color: #747264;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 20px;

  & > h2 {
    cursor: pointer;
    transition: color 0.3s ease;
  }

  @media (max-width: 680px) {
    gap: 10px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  min-width: 150px;
`;

const StyledLink = styled(NavLink) <TypographyProps>`
  ${typography}
  ${color}
  color: gold;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 5px 10px;

  .bar {
    display: none;
  }
  
  &:hover {
    color: #FABC3F;
  }

   &.active {
    .bar {
      display: block;
      width: 30%;
      margin: 0 auto;
      margin-top: 5px;
      height: 3px;
      background-color: #ff6600;
    }
  }

`;

const SortBy = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1px;
  border-bottom: 2px solid #45474B;
  border-radius: 5px;
  padding: 2px 5px;
  select {
    padding: 5px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: transparent;
    color: #ff6600;
    font-size: 1rem;
    cursor: pointer;
    text-align: left;
    }
    
    option {
      background-color: #45474B;
      color: white;
      padding: 5px;
      margin: 5px;
      border: none;
      outline: none;
    }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  background-color: #747264;
  border: none;
  border-bottom: 2px solid #EEEDEB;
  border-radius: 5px;
  padding: 2px 5px;
  width: 440px;
  max-width: 100%;
  transition: border 0.3s ease;

  input {
    flex-grow: 1;
    border: none;
    background: inherit;
    outline: none;
    padding: 3px;
    font-size: 0.9rem;
    color: white;

    &::placeholder {
      color: white;
    }
  }

  &:focus-within {
    border-bottom: 2px solid #ff6600;
    background-color: #45474B;
  }
  
  svg {
    color: white;
    font-size: 1rem;
    cursor: pointer;
    min-width: 30px;
  }

  input:-internal-autofill-selected {
    background-color: #45474B !important;
    border-radius: 5px;
  }
`;

const SearchAndSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

const LogoAndCategories = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: 100%;

  @media (max-width: 680px) {
    gap: 15px;
  }
`;

const LogoAndCategoriesAndLogOut = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
`;

export { Header, Logo, Button, Categories, StyledForm, StyledLink, SortBy, Search, SearchAndSort, LogoAndCategories, LogoAndCategoriesAndLogOut };