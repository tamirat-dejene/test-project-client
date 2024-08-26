import React, { useEffect } from "react";
import { Form, useNavigate } from "react-router-dom";

import ErrorComponent from "./Error.js";
import EmptyResponse from "./EmptyResponse.js";
import TableSkeleton from "./skeletons/table-skeleton.js";
import { useAppDispatch, useAppSelector } from "../app/hooks.js";

import { deleteMusicRequested, resetDeleteMusicState } from "../features/music-data-slice.js";
import { Actions, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../styles/musics';
import { FaEdit, FaSpinner, FaTrash } from "react-icons/fa";

const Musics: React.FC = () => {
  const { musicData, loading, loadError } = useAppSelector(state => state.musicData);
  const { deleteIsPending, deleteError, deletedMusicId } = useAppSelector(state => state.musicData);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget[0] as HTMLInputElement;
    dispatch(deleteMusicRequested({ deletedMusicId: Number(target.value) }));
  };

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    navigate(`/musics/${e.currentTarget.value}/edit`);
  };

  useEffect(() => {
    if (deletedMusicId && !deleteIsPending && !deleteError) {
      console.log(`Music with id ${deletedMusicId} has been deleted`);
      resetDeleteMusicState();
    } else if (deleteError) {
      console.log('Delete error', deleteError);
    }
  }, [deleteError, deleteIsPending, deletedMusicId, dispatch, navigate]);

  return (
    <TableContainer>
      {loading && <TableSkeleton />}
      {loadError && <ErrorComponent message={loadError} />}
      {musicData && !loading && musicData.length === 0 && !loadError && <EmptyResponse message='No songs have found' />}
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
                      <Button value={music.id} type="button" onClick={handleEdit}
                        disabled={deletedMusicId === music.id}
                        aria-disabled={deletedMusicId === music.id}>
                        Edit{' '}<FaEdit />
                      </Button>
                    </Form>
                    <Form onSubmit={handleDelete}>
                      <Button color="red"
                        type="submit"
                        value={music.id}
                        aria-disabled={deleteIsPending}
                        disabled={deleteIsPending}>{
                          deletedMusicId === music.id ?
                            <>Del...<FaSpinner /></> :
                            <>Delete <FaTrash /></>
                        }</Button>
                    </Form>
                  </Actions>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>}
    </TableContainer>
  );
};

export default Musics;
