import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../styles/albums";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createMusicRequested } from "../features/createmusic/create-music-slice";
import { Form, FormContainer, FormLabel, FormRow, Input, InputData, Label, Underline, ButtonContainer, StyledLink, StyledButton } from "../styles/music-form";
import { Mode } from "../definitions/defn";
import { updateMusicRequested } from "../features/updateMusic/update-music-slice";



const MusicForm = ({ mode }: { mode: Mode }) => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [url, setUrl] = useState("");

  const { musicId } = useParams();
  useEffect(() => {
    if (mode === 'edit' && musicId) {
      fetch(`https://test-project-server-tamiu.vercel.app/musics/${musicId}`)
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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { createdMusic, createError, isPending } = useAppSelector(state => state.createMusic);
  const upDate = useAppSelector(state => state.updateMusic);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    if (mode === 'edit') {
      dispatch(updateMusicRequested({ id: musicId, title, artist, album, genre, duration, url }));
    } else {
      dispatch(createMusicRequested({ title, artist, album, genre, duration, url }));
    }
  }

  useEffect(() => {
    switch (mode) {
      case 'create':
        if (!isPending && createdMusic) {
          window.alert('New Music created!');
          setTitle('');
          setArtist('');
          setAlbum('');
          setGenre('');
          setDuration('');
          setUrl('');
          navigate('/');
        } else if (!isPending && createError) {
          console.log("Error creating music: ", createError);
          window.alert('Error creating music');
        }
        break;
      case 'edit':
        if (!upDate.isPending && upDate.updatedMusic) {
          window.alert('Music updated!');
          setTitle('');
          setArtist('');
          setAlbum('');
          setGenre('');
          setDuration('');
          setUrl('');
          navigate('/');
        } else if (!isPending && createError) {
          console.log("Error updating music: ", createError);
          window.alert('Error updating music');
        }
    }
  }, [isPending, createdMusic, createError, navigate, mode, upDate.isPending, upDate.updatedMusic, upDate.updateError]);

  return (
    <Container>
      <FormContainer>
        <FormLabel>New Music</FormLabel>
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
            <StyledButton type="submit" disabled={isPending} aria-disabled={isPending}>
              {isPending ? (mode === 'create' ? "Creating..." : "Updating...") : (mode === 'create' ? "Create Music" : "Update Music")}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
    </Container>
  );
}

export default MusicForm;
