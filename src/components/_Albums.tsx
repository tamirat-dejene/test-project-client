import { EmptyResponse } from "./Popup";
import { useAppSelector } from "../app/hooks";
import albumIcon from '../assets/albumIcon.png';
import AlbumSkeleton from "./skeletons/album-skeleton";
import { AlbumArtist, AlbumCard, AlbumImage, AlbumTitle, AlbumsContainer } from '../styles/albums';

const Albums = () => {
  const { musicList, fetchIsPending, musicDataError } = useAppSelector(state => state.musicData);

  return (
    <AlbumsContainer>
      {fetchIsPending && <AlbumSkeleton />}
      {musicList && !fetchIsPending && musicList.length === 0 && !musicDataError && <EmptyResponse message='No albums found' />}
      {musicList && !fetchIsPending && musicList.length !== 0 && !musicDataError && musicList.map((album) => (
        <AlbumCard key={album.id}>
          <AlbumImage
            src={albumIcon}
            width={80}
            height={80}
            alt={`${album.album} cover`}
          />
          <AlbumTitle>{album.album}</AlbumTitle>
          <AlbumArtist>{album.artist}</AlbumArtist>
        </AlbumCard>
      ))}
    </AlbumsContainer>
  );
};

export default Albums;