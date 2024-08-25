import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";
import { Container } from "../styles/albums";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import TableSkeleton from "./skeletons/table-skeleton.js";
import EmptyResponse from "./EmptyResponse.js";
import ErrorComponent from "./Error.js";

import { deleteMusicRequested, resetDeleteMusicState } from "../features/deletemusic/delete-music-slice.js";
import { Actions, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../styles/musics';

const Musics: React.FC = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);
  const { deleteIsPending } = useAppSelector(state => state.deleteMusic);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget[0] as HTMLInputElement;
    dispatch(deleteMusicRequested(target.value));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(`/musics/${e.currentTarget.value}/edit`);
  };

  useEffect(() => {
    if (!deleteIsPending) {
      navigate('/');
      dispatch(resetDeleteMusicState());
    }
  }, [deleteIsPending, dispatch, navigate]);


  return (
    <Container>
      <TableContainer>
        {loading && <TableSkeleton />}
        {loadError && <ErrorComponent message={loadError} />}
        {musicData && !loading && musicData.length === 0 && <EmptyResponse message='No songs found' />}
        {musicData && !loading && musicData.length !== 0 && !loadError &&
          <Table>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Artist</Th>
                <Th>Album</Th>
                <Th>Genre</Th>
                <Th>Duration</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {musicData.map((music) => (
                <Tr key={music.id}>
                  <Td>{music.title}</Td>
                  <Td>{music.artist}</Td>
                  <Td>{music.album}</Td>
                  <Td>{music.genre}</Td>
                  <Td>{music.duration}</Td>
                  <Td>
                    <Actions>
                      <Form>
                        <Button value={music.id} type="button" onClick={handleEdit}>Edit</Button>
                      </Form>
                      <Form onSubmit={handleDelete}>
                        <Button color="red"
                          type="submit"
                          value={music.id}
                          aria-disabled={deleteIsPending}
                          onClick={(e) => {
                            e.currentTarget.blur();
                            e.currentTarget.textContent = "Deleting"
                            e.currentTarget.style.pointerEvents = 'none';
                          }}
                          disabled={deleteIsPending}>Delete</Button>
                      </Form>
                    </Actions>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>}
      </TableContainer>
    </Container>
  );
};


// const DeleteButton = () => {
//   const [pendingDelete, setPendingDelete] = useState(false);
//   return (
//     <Button type="submit" color="red"
//       aria-disabled={pendingDelete}
//       disabled={pendingDelete}
//       onClick={() => setPendingDelete(true)}
//     >
//       {pendingDelete ? "Deleting..." : "Delete"}
//     </Button>
//   );
// }

export default Musics;
