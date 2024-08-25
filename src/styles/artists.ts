import styled from "@emotion/styled";
import { space, layout, typography, color } from "styled-system";

const ArtistsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  ${space}
`;

const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: inherit;

  margin: 8px;
  padding: 12px;
  width: 120px;
  height: 120px;

  ${space}
  ${layout}
  ${color}
`;

const ArtistImage = styled.img`
  border-radius: 50%;
  border: 2px solid goldenrod;
  margin-bottom: 5px;
  text-align: left;
  background-color: #537188;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
  ${layout}
`;

const ArtistName = styled.p`
  font-weight: bold;
  font-size: 0.7rem;
  width: 100%;
  color: white;
  text-align: center;
  text-wrap: nowrap;

  ${typography}
`;

export { ArtistsContainer, ArtistCard, ArtistImage, ArtistName };