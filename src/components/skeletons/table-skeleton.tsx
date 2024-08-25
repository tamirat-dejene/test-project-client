import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Actions, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "../../styles/musics";

const TableSkeleton = () => (
  <TableContainer>
    <Table>
      <Thead>
        <Tr>
          <Th><Skeleton width={80} enableAnimation height={30} highlightColor="#444" baseColor="#555"/></Th>
          <Th><Skeleton width={80} enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Th>
          <Th><Skeleton width={80} enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Th>
          <Th><Skeleton width={80} enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Th>
          <Th><Skeleton width={80} enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Th>
          <Th><Skeleton width={50} enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Th>
        </Tr>
      </Thead>
      <Tbody>
        {Array(7)
          .fill(null)
          .map((_, index) => (
            <Tr key={index}>
              <Td><Skeleton width="100%" enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Td>
              <Td><Skeleton width="100%" enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Td>
              <Td><Skeleton width="100%" enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Td>
              <Td><Skeleton width="100%" enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Td>
              <Td><Skeleton width="100%" enableAnimation height={30} highlightColor="#444" baseColor="#555" /></Td>
              <Td>
                <Actions>
                  <Skeleton width={60} height={30} highlightColor="#444" baseColor="#555" />
                  <Skeleton width={60} height={30} highlightColor="#444" baseColor="#555" />
                </Actions>
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default TableSkeleton;
