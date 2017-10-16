import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  * { box-sizing: border-box; }
  body {
    min-height: 100vh;
    margin: 0;
    padding: 1em;
  }

  body, input, button {
    font-family: 'Open Sans', sans-serif;
    font-size: 100%;
    color: #2d2d2d;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
