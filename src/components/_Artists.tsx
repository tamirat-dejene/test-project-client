import { EmptyResponse } from "./Popup";
import { useAppSelector } from "../app/hooks";
import ArtistSkeleton from "./skeletons/artist-skeleton";
import { ArtistCard, ArtistImage, ArtistName, ArtistsContainer } from '../styles/artists';


const Artists = () => {
  const { musicData, loading, musicDataError } = useAppSelector(state => state.musicData);

  return (
    <ArtistsContainer>
      {loading && <ArtistSkeleton />}
      {musicData && !loading && musicData.length === 0 && !musicDataError && <EmptyResponse message='No artists found' />}
      {musicData && !loading && musicData.length !== 0 && !musicDataError && musicData.map((artist) => (
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
