/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { getMusics } from "../services/mockdata";
import { Music } from "../definitions/defn";
import albumIcon from '../assets/albumIcon.png';
import { AlbumArtist, AlbumCard, AlbumImage, AlbumTitle, AlbumsContainer, Container} from '../styles/albums';  

const Albums = () => {
  const [albums, setAlbums] = useState<Music[]>([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const musics = await getMusics();
      const albums = musics.filter((music, index, self) =>
        index === self.findIndex((t) => t.album === music.album)
      );
      setAlbums(albums);
    };
    fetchAlbums();
  }, []);

  return (
    <Container>
      <AlbumsContainer>
        {albums.map((album) => (
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
