import styled from 'styled-components'

const TextBox = styled.input.attrs({ type: 'text' })`
  background: white;
  border: none;
  padding: 0.75em;
  border-radius: 2px;
  outline: none;
  border: 1px solid #145da0;
  flex: 1;

  &::placeholder {
    color: grey;
  }

  &:focus {
    border: 1px solid #145da0;
  }
`

export default TextBox
