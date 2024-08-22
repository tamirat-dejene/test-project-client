import styled from "@emotion/styled";
import { space, layout, color, typography, SpaceProps, LayoutProps, ColorProps, TypographyProps } from "styled-system";
import { Link } from "react-router-dom";
type ButtonProps = SpaceProps & LayoutProps & ColorProps & TypographyProps;

const Header = styled.header`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 25px;
  padding: 15px;
  background: inherit;
  color: white;
  height: 20vh;
  width: 90vw;
  margin: 0 auto;
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
    font-size: 3rem;
  }

  @media (max-width: 680px) {
    flex-direction: column;
    gap: 5px;

    h1 {
      display: none;
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
  width: 100%;

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
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  min-width: 150px;
`;

const StyledLink = styled(Link) <TypographyProps>`
  ${typography}
  ${color}
  color: gold;
  font-size: 1.2rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #FABC3F;
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
  width: 300px;
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
`;

const SearchAndSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const LogoAndCategories = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  align-items: center;
  width: 100%;
`;

const LogoAndCategoriesAndAddMusic = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 680px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export { Header, Logo, Button, Categories, StyledForm, StyledLink, SortBy, Search, SearchAndSort, LogoAndCategories, LogoAndCategoriesAndAddMusic };