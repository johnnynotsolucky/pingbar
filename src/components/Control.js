import React from 'react'
import crypto from 'crypto'
import styled from 'styled-components'
import Label from '../styles/Label'


const Container = styled.div`
  display: flex;
  flex-direction: column;
`

class Control extends React.Component {
  constructor() {
    super()
    this.state = {
      controlId: crypto.randomBytes(8).toString('hex')
    }
  }

  render() {
    const { label, children } = this.props
    const { controlId } = this.state
    return (
      <Container>
        <Label htmlFor={controlId}>{label}</Label>
        {children(controlId)}
      </Container>
    )
  }
}

export default Control
