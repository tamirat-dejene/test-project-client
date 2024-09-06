import _ from 'lodash';
import { useNavigate } from "react-router-dom";
import React, { useCallback, useEffect } from "react";
import { FaPlayCircle, FaPlusCircle, FaSearch, FaUserMinus } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../app/hooks.ts";
import { logoutUserRequested, setLoggedOut } from "../features/user-data-slice.ts";
import { fetchMusicDataRequested, resetFetchDataState, setSearchQuery, setSortOption } from "../features/music-data-slice.ts";
import { Button, Categories, Header, Logo, LogoAndCategories, LogoAndCategoriesAndLogOut, Search, SearchAndSort, SortBy, StyledLink } from '../styles/navbar';

const NavBar: React.FC<{ height: string }> = ({ height }) => {
  const searchQuery = useAppSelector(state => state.musicData.searchQuery);
  const sortOption = useAppSelector(state => state.musicData.sortOption);
  const accessToken = useAppSelector(state => state.userData.accessToken);
  const { loggedOut, logoutIsPending } = useAppSelector(state => state.userData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchMusicData = useCallback(_.debounce(() => { dispatch(fetchMusicDataRequested()) }, 500), []);

  useEffect(() => {
    if (accessToken)
      debouncedFetchMusicData();
  }, [searchQuery, sortOption, debouncedFetchMusicData, accessToken, navigate]);

  const handleLogOut = () => {
    dispatch(logoutUserRequested());
  };
  
  useEffect(() => {
    if (loggedOut) {
      window.history.replaceState(null, '', '/');
      dispatch(resetFetchDataState());
      dispatch(setLoggedOut(false));
    }
  }, [loggedOut, dispatch]);
      

  const loggedIn = useAppSelector(state => state.userData.accessToken);
  return (
    <Header height={height}>
      <LogoAndCategoriesAndLogOut>
        <LogoAndCategories>
          <Logo fontSize="2rem">
            <FaPlayCircle color="gold" size={50} />
            <h1>Music</h1>
          </Logo>
          {loggedIn &&
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
          }
        </LogoAndCategories>
        {loggedIn &&
          <Button type="button" onClick={handleLogOut}
            disabled={logoutIsPending} title="Logout"
          >
            <FaUserMinus color="gold" />
            <p>{
              logoutIsPending ? 'Loggi...' : 'Logout'
            }</p>
          </Button>
        }
      </LogoAndCategoriesAndLogOut>

      {loggedIn &&
        <SearchAndSort>
          <Search>
            <input
              type="text"
              name='q' id='q'
              value={searchQuery}
              placeholder="Search"
              onChange={e => dispatch(setSearchQuery({ searchQuery: e.target.value }))}
            />
            <FaSearch title="Search" style={{ borderRight: '1px solid white' }} />
            <FaPlusCircle color="gold" onClick={() => navigate('/musics/new')} title="Create new" />

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
      }
    </Header>
  );
};
export default NavBar;
