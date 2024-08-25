import styled from '@emotion/styled';

const ErrorContainer = styled.div`
  background-color: #f8d7da;
  color: #d8000c;
  padding: 15px;
  border-radius: 5px;
  border: 1px solid #d8000c;
  margin: 10px 0;
  text-align: center;
  font-size: 1rem;
  width: 100%;
`;

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <ErrorContainer>
      <p>{message}</p>
    </ErrorContainer>
  );
};

export default ErrorComponent;
