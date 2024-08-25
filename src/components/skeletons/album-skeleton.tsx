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
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 10px;
  padding: 10px;
  width: 150px;
  height: 150px;

`;

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 10px;
`;

const AlbumSkeleton = () => {
  return (
    <SkeletonContainer>
      {Array(16).fill(null).map((_, index) => (
        <SkeletonCard key={index}>
          <Skeleton height={80} width={80} enableAnimation highlightColor='#444' baseColor='#555' />
          <TextContainer>
            <Skeleton width={100} height={14} enableAnimation highlightColor='#444' baseColor='#555' />
            <Skeleton width={80} height={10} enableAnimation highlightColor='#444' baseColor='#555' />
          </TextContainer>
        </SkeletonCard>
      ))}
    </SkeletonContainer>
  );
};

export default AlbumSkeleton;
