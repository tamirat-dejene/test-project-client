import styled from '@emotion/styled';

const Contain = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
  text-align: center;
`;

const Fof = styled.div`
  display: table-cell;
  vertical-align: middle;

  h1 {
    font-size: 50px;
    display: inline-block;
    padding-right: 12px;
    animation: type 0.5s alternate infinite;
  }

  @keyframes type {
    from {
      box-shadow: inset -3px 0px 0px #888;
    }
    to {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
`;

const NotFound = () => {
  return (
    <Contain>
      <Fof>
        <h1>404</h1>
        <h2>Page Not Found</h2>
      </Fof>
    </Contain>
  );
}

export default NotFound;