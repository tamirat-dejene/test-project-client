import React from "react";
import { FaMusic, FaPlayCircle, FaSearch } from "react-icons/fa";
import { Button, Categories, Header, Logo, LogoAndCategories, LogoAndCategoriesAndAddMusic, Search, SearchAndSort, SortBy, StyledForm, StyledLink } from '../styles/navbar.tsx';
import { getMusics } from "../services/mockdata.ts";

const NavBar: React.FC = () => {
  return (
    <Header>
      <LogoAndCategoriesAndAddMusic>
        <LogoAndCategories>
          <Logo fontSize="2rem">
            <FaPlayCircle color="gold" size={50} />
            <h1>Music</h1>
          </Logo>
          <Categories>
            <StyledLink to={"/songs"}>Songs
              <div className="bar"></div>
            </StyledLink>
            <StyledLink to={"/albums"}>Albums
              <div className="bar"></div>
            </StyledLink>
            <StyledLink to={"/artists"}>Artists
              <div className="bar"></div>
            </StyledLink>
          </Categories>
        </LogoAndCategories>
        <StyledForm>
          <Button type="submit" m="0" p="2">
            <FaMusic color="gold" />
            <p>{ }Add music</p>
          </Button>
        </StyledForm>
      </LogoAndCategoriesAndAddMusic>

      <SearchAndSort>
        <Search>
          <input type="text" name='q' id='q' placeholder="Search" onChange={() => { }} />
          <FaSearch />
        </Search>
        <SortBy>
          <label htmlFor="sortby">Sort by:</label>
          <select name="sortby" id="sortby">
            <option value="a-z">A - Z</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="date-added">Date added</option>
          </select>
        </SortBy>
      </SearchAndSort>
    </Header>
  );
};

const action = async () => {

}

const loader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const path = url.searchParams.get("q");
  const data = await getMusics();
  return { data, path }
}
// eslint-disable-next-line react-refresh/only-export-components
export { action, loader };
export default NavBar;
