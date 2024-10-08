import styled from "@emotion/styled";
import { space, layout, typography, color } from "styled-system";

const AlbumsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: inherit;

  justify-self: flex-start;
  align-self: flex-start;
  margin-bottom: 20px;
  ${space}
`;

const AlbumCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #A8A196;
  
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  width: 150px;
  height: 150px;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  ${space}
  ${layout}
  ${color}

  @media (max-width: 768px) {
    width: 130px;
    height: 130px
    padding: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const AlbumImage = styled.img`
  margin-bottom: 5px;
  ${layout}
`;

const AlbumTitle = styled.p`
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 2px;
  width: 100%;
  text-align: left;
  color: white
  ${typography}
  `;

const AlbumArtist = styled.p`
  font-size: 0.7rem;
  width: 100%;
  text-align: left;
  color: white;
  ${typography}
`;

export { AlbumsContainer, AlbumCard, AlbumImage, AlbumTitle, AlbumArtist };