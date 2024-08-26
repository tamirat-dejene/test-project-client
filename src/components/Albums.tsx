import ErrorComponent from "./Error";
import EmptyResponse from './EmptyResponse';
import { useAppSelector } from "../app/hooks";
import albumIcon from '../assets/albumIcon.png';
import AlbumSkeleton from "./skeletons/album-skeleton";
import { AlbumArtist, AlbumCard, AlbumImage, AlbumTitle, AlbumsContainer } from '../styles/albums';

const Albums = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);

  return (
    <AlbumsContainer>
      {loading && <AlbumSkeleton />}
      {loadError && ErrorComponent({ message: loadError })}
      {musicData && !loading && musicData.length === 0 && <EmptyResponse message='No albums found' />}
      {musicData && !loading && musicData.length !== 0 && musicData.map((album) => (
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
