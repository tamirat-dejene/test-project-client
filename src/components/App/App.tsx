import { css } from '@emotion/react'
import styled from '@emotion/styled'

const color = 'white'
const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`
function App() {
  return (
    <>
      <div
        css={css`
        padding: 32px;
        background-color: hotpink;
        font-size: 24px;
        border-radius: 4px;
        &:hover {
          color: ${color};
          }
          `}
      >
        Test Project
      </div>
      <Button>My Button</Button>
    </>
  )
}

export default App