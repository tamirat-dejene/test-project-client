/** @jsxImportSource @emotion/react */
import { Container } from "../styles/albums";
import { ArtistCard, ArtistImage, ArtistName, ArtistsContainer } from '../styles/artists';
import { useAppSelector } from "../app/hooks";
import ArtistSkeleton from "./skeletons/artist-skeleton";
import ErrorComponent from "./Error";
import EmptyResponse from "./EmptyResponse";


const Artists = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);

  return (
    <Container>
      {loading && <ArtistSkeleton />}
      {loadError && <ErrorComponent message={loadError} />}
      <ArtistsContainer>
        {musicData && !loading && musicData.length === 0 && <EmptyResponse message='No artists found' />}
        {musicData && !loading && musicData.length !== 0 && musicData.map((artist) => (
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
