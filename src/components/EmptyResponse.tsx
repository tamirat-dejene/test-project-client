import styled from '@emotion/styled';

const EmptyResponseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

const EmptyResponse = ({ message }: { message: string }) => {
  return (
    <EmptyResponseContainer>
      <p>{message}</p>
    </EmptyResponseContainer>
  );
};

export default EmptyResponse;