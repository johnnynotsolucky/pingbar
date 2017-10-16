const electron = require('electron')
const menubar = require('./menubar')
const ping = require('ping')
const Config = require('electron-config')

var mb = menubar({
  icon: './assets/grey.png',
  index: 'http://localhost:3000',
})

let intervalId

const startInterval = (config) => {
  clearInterval(intervalId)
  intervalId = setInterval(() => {
    ping.promise.probe(config.host)
      .then(result => {
        result.avg < 45
          ? mb.tray.setImage('./assets/blue.png')
          : result.avg < 100
            ? mb.tray.setImage('./assets/red.png')
            : mb.tray.setImage('./assets/grey.png')
        result.alive
          ? mb.tray.setTitle('' + Math.round(parseFloat(result.avg)))
          : mb.tray.setTitle('')
      })
  }, 5000)
}

const getConfig = store => () => ({
  host: store.get('host') || 'google.com',
})

mb.on('ready', function ready() {
  const store = new Config()

  const getConfigStore = getConfig(store)

  const { ipcMain } = electron
  ipcMain.on('ready', (ev) => ev.sender.send('config', getConfigStore()))
  electron.ipcMain.on('config', (ev, key, value) => {
    store.set(key, value)
    startInterval(getConfigStore())
  })

  startInterval(getConfigStore())
})
