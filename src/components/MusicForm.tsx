import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Mode } from "../definitions/defn";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createMusicRequested, resetCreateMusicState, resetUpdateMusicState, updateMusicRequested } from "../features/music-data-slice";
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

  const { musicData, createdMusic, createIsPending, updatedMusic, updateIsPending, musicDataError } = useAppSelector(state => state.musicData);

  useEffect(() => {
    if (mode === 'edit' && musicData) {
      const music = musicData.find(music => music.id === Number(musicId));
      if (music) {
        setTitle(music.title || '');
        setArtist(music.artist || '');
        setAlbum(music.album || '');
        setGenre(music.genre || '');
        setDuration(music.duration);
        setUrl(music.url);
      }
    }
  }, [mode, musicData, musicId]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (mode === 'edit') {
      const updated = { updated: { id: Number(musicId), title, artist, album, genre, duration, url } }
      console.log("Updating music: ", updated);
      dispatch(updateMusicRequested({ updatedMusic: { id: Number(musicId), title, artist, album, genre, duration, url } }));
    } else {
      console.log("Creating music: ", { title, artist, album, genre, duration, url });
      dispatch(createMusicRequested({ newMusic: { title, artist, album, genre, duration, url } }));
    }
  }


  useEffect(() => {
    switch (mode) {
      case 'create':
        if (!createIsPending && !musicDataError && createdMusic) {
          console.log("Music created: ", createdMusic);
          setTitle(''); setArtist(''); setAlbum(''); setGenre(''); setDuration(''); setUrl('');

          navigate('/musics');
          dispatch(resetCreateMusicState());
        } else if (!createIsPending && musicDataError && !createdMusic) {
          console.log("Error creating music: ", musicDataError);
        }
        break;
      case 'edit':
        if (!updateIsPending && updatedMusic && !musicDataError) {
          console.log("Music updated: ", updatedMusic);
          setTitle(''); setArtist(''); setAlbum(''); setGenre(''); setDuration(''); setUrl('');

          navigate('/musics');
          dispatch(resetUpdateMusicState());
        } else if (!updateIsPending && musicDataError && updatedMusic) {
          console.log("Error updating music: ", musicDataError);
        }
    }
  }, [createIsPending, updateIsPending, createdMusic, updatedMusic, musicDataError, mode, dispatch, navigate, musicData]);

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
                required
                onChange={e => setTitle(e.target.value)}
              />
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
                required
                onChange={e => setArtist(e.target.value)}
              />
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
                required
                onChange={e => setAlbum(e.target.value)}
              />
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
                required
                onChange={e => setGenre(e.target.value)}
              />
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
                required
                onChange={e => setDuration(e.target.value)}
              />
              <Label htmlFor="music-duration">Duration</Label>
              <Underline />
            </InputData>
          </FormRow>

          <FormRow>
            <InputData>
              <Input type="url"
                value={url}
                name="url"
                id="music-url" aria-describedby="url-error"
                required
                onChange={e => setUrl(e.target.value)}
              />
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
