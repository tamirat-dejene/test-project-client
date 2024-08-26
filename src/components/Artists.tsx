import ErrorComponent from "./Error";
import EmptyResponse from "./EmptyResponse";
import { useAppSelector } from "../app/hooks";
import ArtistSkeleton from "./skeletons/artist-skeleton";
import { ArtistCard, ArtistImage, ArtistName, ArtistsContainer } from '../styles/artists';


const Artists = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);

  return (
    <ArtistsContainer>
      {loading && <ArtistSkeleton />}
      {loadError && <ErrorComponent message={loadError} />}
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
  );
};

export default Artists;
