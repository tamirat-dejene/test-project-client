/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { getMusics } from "../services/mockdata";
import { Music } from "../definitions/defn";
import { Container } from "../styles/albums";
import { ArtistCard, ArtistImage, ArtistName, ArtistsContainer} from '../styles/artists';


const Artists = () => {
  const [artists, setArtists] = useState<Music[]>([]);

  useEffect(() => {
    const fetchArtists = async () => {
      const artists = await getMusics();
      const uniqueArtists = artists.filter(
        (artist, index, self) =>
          index === self.findIndex((t) => t.artist === artist.artist)
      );

      setArtists(uniqueArtists);
    };
    fetchArtists();
  }, []);

  return (
    <Container>
      <ArtistsContainer>
        {artists.map((artist) => (
          <ArtistCard key={artist.id}>
            <ArtistImage
              src={`https://robohash.org/${artist.id}.png?size=100x100`}
              alt={artist.artist}
            />
            <ArtistName>{artist.artist}</ArtistName>
          </ArtistCard>
        ))}
      </ArtistsContainer>
    </Container>
  );
};

export default Artists;
