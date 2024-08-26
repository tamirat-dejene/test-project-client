import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { FaMusic, FaPlayCircle, FaSearch } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { fetchMusicDataRequested, setSearchQuery, setSortOption } from "../features/music-data-slice.ts";
import { Button, Categories, Header, Logo, LogoAndCategories, LogoAndCategoriesAndAddMusic, Search, SearchAndSort, SortBy, StyledLink } from '../styles/navbar';
import _ from 'lodash';

const NavBar: React.FC = () => {
  const searchQuery = useAppSelector(state => state.musicData.searchQuery);
  const sortOption = useAppSelector(state => state.musicData.sortOption);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMusicData = useCallback(
    _.debounce(() => {
      dispatch(fetchMusicDataRequested())
    }, 500), []);

  useEffect(() => {
    debouncedFetchMusicData();
  }, [searchQuery, sortOption, debouncedFetchMusicData]);

  return (
    <Header>
      <LogoAndCategoriesAndAddMusic>
        <LogoAndCategories>
          <Logo fontSize="2rem">
            <FaPlayCircle color="gold" size={50} />
            <h1>Music</h1>
          </Logo>
          <Categories>
            <StyledLink to={"/musics"}>Songs
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
        <Button type="button" m="0" p="2"
          onClick={() => navigate('/musics/new')}>
          <FaMusic color="gold" />
          <p>{ }Add music</p>
        </Button>
      </LogoAndCategoriesAndAddMusic>

      <SearchAndSort>
        <Search>
          <input
            type="text"
            name='q' id='q'
            value={searchQuery}
            placeholder="Search"
            onChange={e => dispatch(setSearchQuery({ searchQuery: e.target.value }))}
          />
          <FaSearch />
        </Search>
        <SortBy>
          <label htmlFor="sortby">Sort by:</label>
          <select
            name="sortby" id="sortby"
            value={sortOption}
            onChange={e => dispatch(setSortOption({ sortOption: e.target.value }))}
          >
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
            <option value="artist">Artist</option>
            <option value="album">Album</option>
            <option value="genre">Genre</option>
            <option value="duration">Duration</option>
          </select>
        </SortBy>
      </SearchAndSort>
    </Header>
  );
};
export default NavBar;
