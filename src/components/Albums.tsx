/** @jsxImportSource @emotion/react */
import albumIcon from '../assets/albumIcon.png';
import { AlbumArtist, AlbumCard, AlbumImage, AlbumTitle, AlbumsContainer, Container} from '../styles/albums';  
import { useAppSelector } from "../app/hooks";
import ErrorComponent from "./Error";
import AlbumSkeleton from "./skeletons/album-skeleton";
import EmptyResponse from './EmptyResponse';

const Albums = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);

  return (
    <Container>
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
    </Container>
  );
};

export default Albums;
