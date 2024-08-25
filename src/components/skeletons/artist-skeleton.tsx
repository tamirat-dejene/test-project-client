import styled from '@emotion/styled';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SkeletonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SkeletonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: inherit;

  margin: 8px;
  padding: 12px;
  width: 120px;
  height: 120px;
`;

const ArtistSkeleton = () => {
  return (
    <SkeletonContainer>
      {Array(20).fill(null).map((_, index) => (
        <SkeletonCard key={index}>
          <Skeleton circle={true} height={100} width={100} enableAnimation highlightColor='#444' baseColor='#555' />
          <Skeleton width={80} height={15} style={{ marginTop: 10 }} enableAnimation highlightColor='#444' baseColor='#555' />
        </SkeletonCard>
      ))}
    </SkeletonContainer>
  );
};

export default ArtistSkeleton;
