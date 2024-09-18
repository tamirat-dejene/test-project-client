import { EmptyResponse } from "./Popup";
import { useAppSelector } from "../app/hooks";
import ArtistSkeleton from "./skeletons/artist-skeleton";
import { ArtistCard, ArtistImage, ArtistName, ArtistsContainer } from '../styles/artists';


const Artists = () => {
  const { musicList, fetchIsPending, musicDataError } = useAppSelector(state => state.musicData);

  return (
    <ArtistsContainer>
      {fetchIsPending && <ArtistSkeleton />}
      {musicList && !fetchIsPending && musicList.length === 0 && !musicDataError && <EmptyResponse message='No artists found' />}
      {musicList && !fetchIsPending && musicList.length !== 0 && !musicDataError && musicList.map((artist) => (
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
