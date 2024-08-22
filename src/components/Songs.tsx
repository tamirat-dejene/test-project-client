import React, { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { Music } from "../definitions/defn";
import { getMusics } from '../services/mockdata.js';
import { Actions, Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '../styles/songs.js';
import { Container } from "../styles/albums.js";

const Songs: React.FC = () => {
  const [songs, setSongs] = useState<Music[]>([]);

  useEffect(() => {
    const fetchMusics = async () => {
      const songs = await getMusics();
      setSongs(songs);
    };
    fetchMusics();
  }, []);

  return (
    <Container>
      <TableContainer>
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
            {songs.map((song) => (
              <Tr key={song.id}>
                <Td>{song.title}</Td>
                <Td>{song.artist}</Td>
                <Td>{song.album}</Td>
                <Td>{song.genre}</Td>
                <Td>{song.duration}</Td>
                <Td>
                  <Actions>
                    <Form>
                      <Button>Edit</Button>
                    </Form>
                    <Form>
                      <Button color="red">Delete</Button>
                    </Form>
                  </Actions>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Songs;
