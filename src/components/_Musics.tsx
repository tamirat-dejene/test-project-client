import React from "react";
import { Form, useNavigate } from "react-router-dom";
import { FaEdit, FaSpinner, FaTrash } from "react-icons/fa";

import { useAppDispatch, useAppSelector } from "../app/hooks.js";
import { deleteMusicRequested } from "../features/music-data-slice.js";

import { EmptyResponse } from "./Popup.js";
import TableSkeleton from "./skeletons/table-skeleton.js";
import { Actions, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../styles/musics.js';

const Musics: React.FC = () => {
  const { musicList, fetchIsPending, deleteIsPending, deletedMusicId, musicDataError } = useAppSelector(state => state.musicData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget[0] as HTMLInputElement;
    dispatch(deleteMusicRequested({ deletedMusicId: Number(target.value) }));
  };

  return (
    <TableContainer>
      {fetchIsPending && <TableSkeleton />}
      {musicList && !fetchIsPending && musicList.length === 0 && !musicDataError && <EmptyResponse message='No songs found' />}
      {musicList && !fetchIsPending && musicList.length !== 0 && !musicDataError &&
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
            {musicList.map((music) => (
              <Tr key={music.id}>
                <Td>{music.title}</Td>
                <Td>{music.artist}</Td>
                <Td>{music.album}</Td>
                <Td>{music.genre}</Td>
                <Td>{music.duration}</Td>
                <Td>
                  <Actions>
                    <Form>
                      <Button value={music.id} type="button"
                        onClick={event => navigate(`/musics/${event.currentTarget.value}/edit`)}
                        disabled={deletedMusicId === music.id}
                        aria-disabled={deletedMusicId === music.id}>
                        <>Edit{' '}<FaEdit
                          style={{ width: '17px', height: '17px' }}
                        /></>
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
