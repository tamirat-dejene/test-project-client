import { Mode } from "../definitions/defn";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createMusicRequested, resetCreateMusicState } from "../features/createmusic/create-music-slice";
import { resetUpdateMusicState, updateMusicRequested } from "../features/updateMusic/update-music-slice";
import { Form, FormContainer, FormLabel, FormRow, Input, InputData, Label, Underline, ButtonContainer, StyledLink, StyledButton } from "../styles/music-form";

const MusicForm = ({ mode }: { mode: Mode }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");

  const { musicId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  useEffect(() => {
    if (mode === 'edit' && musicId) {
      fetch(`https://test-project-server-tdejene.vercel.app/${musicId}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title);
          setArtist(data.artist);
          setAlbum(data.album);
          setGenre(data.genre);
          setDuration(data.duration);
          setUrl(data.url);
        })
        .catch(error => console.error('Error fetching music data:', error));
    }
  }, [mode, musicId]);


  const { createdMusic, createError, createIsPending } = useAppSelector(state => state.createMusic);
  const { updatedMusic, updateError, updateIsPending } = useAppSelector(state => state.updateMusic);
  const { musicData } = useAppSelector(state => state.musicData);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (mode === 'edit') {
      console.log("Updating music: ", { id: musicId, title, artist, album, genre, duration, url });
      dispatch(updateMusicRequested({ id: musicId, title, artist, album, genre, duration, url }));
    } else {
      console.log("Creating music: ", { title, artist, album, genre, duration, url });
      dispatch(createMusicRequested({ title, artist, album, genre, duration, url }));
    }
  }

  useEffect(() => {
    switch (mode) {
      case 'create':
        if (!createIsPending && !createError && createdMusic) {
          console.log("Music created: ", createdMusic);
          setTitle(''); setArtist(''); setAlbum(''); setGenre(''); setDuration(''); setUrl('');
          navigate('/musics');

          dispatch(resetCreateMusicState());
        } else if (!createIsPending && createError && !createdMusic) {
          console.log("Error creating music: ", createError);
        }

        break;
      case 'edit':
        if (!updateIsPending && updatedMusic && !updateError) {
          console.log("Music updated: ", updatedMusic);
          setTitle(''); setArtist(''); setAlbum(''); setGenre(''); setDuration(''); setUrl('');
          navigate('/musics');
          dispatch(resetUpdateMusicState());
        } else if (!updateIsPending && updateError && updatedMusic) {
          console.log("Error updating music: ", updateError);
        }
    }
  }, [createIsPending, updateIsPending, createdMusic, updatedMusic, createError, updateError, mode, dispatch, navigate, musicData]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    }}>
      <FormContainer>
        <FormLabel>{
          mode === 'create'
            ? "Create New Music"
            : "Edit Music"
        }</FormLabel>
        <Form onSubmit={handleSubmit}>
          <FormRow>
            <InputData>
              <Input type="text"
                value={title}
                name="title"
                id="music-title" aria-describedby="title-error"
                onChange={e => setTitle(e.target.value)}
                required />
              <Label htmlFor="music-title">Title</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="text"
                value={artist}
                name="artist"
                id="music-artist" aria-describedby="artist-error"
                onChange={e => setArtist(e.target.value)}
                required />
              <Label htmlFor="music-artist">Artist</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="text"
                value={album}
                name="album"
                id="music-album" aria-describedby="album-error"
                onChange={e => setAlbum(e.target.value)}
                required />
              <Label htmlFor="music-album">Album</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="text"
                value={genre}
                name="genre"
                id="music-genre" aria-describedby="genre-error"
                onChange={e => setGenre(e.target.value)}
                required />
              <Label htmlFor="music-genre">Genre</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="text"
                value={duration}
                name="duration"
                id="music-duration" aria-describedby="duration-error"
                onChange={e => setDuration(e.target.value)}
                required />
              <Label htmlFor="music-duration">Duration</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="text"
                value={url}
                name="url"
                id="music-url" aria-describedby="url-error"
                onChange={e => setUrl(e.target.value)}
                required />
              <Label htmlFor="music-url">URL</Label>
              <Underline />
            </InputData>
          </FormRow>

          <ButtonContainer>
            <StyledLink to="/">
              Cancel
            </StyledLink>
            <StyledButton
              type="submit"
              disabled={updateIsPending || createIsPending}
              aria-disabled={updateIsPending || createIsPending}
            >
              {(createIsPending || updateIsPending)
                ? (mode === 'create' ? "Creating..." : "Updating...")
                : (mode === 'create' ? "Create Music" : "Update Music")}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </div>
  );
}

export default MusicForm;
