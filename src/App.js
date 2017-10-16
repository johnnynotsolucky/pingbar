import React, { Component } from 'react'
import styled from 'styled-components'
import Control from './components/Control'
import TextBox from './styles/TextBox'
import Button from './styles/Button'

const { ipcRenderer } = window.require('electron')

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.right && 'flex-end'};
  margin: 0.5em 0;

  & > :first-child {
    border-radius: 2px 0 0 2px;
  }

  & > :last-child {
    border-radius: 0 2px 2px 0;
  }
`

class App extends Component {
  constructor() {
    super()
    this.state = { host: '' }
    ipcRenderer.send('ready')
    ipcRenderer.on('config', (ev, config) => {
      this.setState(Object.assign({}, config))
    })
  }

  setField = field => (ev) => {
    this.setState({
      [field]: ev.target.value
    })
  }

  updateConfig = key => () => ipcRenderer.send('config', key, this.state[key])

  render() {
    return (
      <Control label="Host">
        {(controlId) => (
          <Container>
            <TextBox id={controlId} value={this.state.host} onInput={this.setField('host')} />
            <Button onClick={this.updateConfig('host')}>Save</Button>
          </Container>
        )}
      </Control>
    )
  }
}

export default App
