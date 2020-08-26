const { app, BrowserWindow, Tray, Menu } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
const nativeImage = require('electron').nativeImage

let trayMenu = Menu.buildFromTemplate([
  {
    label: 'Mostrar', click: () => {
      win.show()
    }
  },
  {
    label: 'Fechar', click: () => {
      win.hide()
      win.close()
      app.quit()
    }
  },
])

var iconPath = isDev ? path.join((__dirname, 'src/assets/tray.png')) : path.join(process.resourcesPath, "tray.png")
let trayIcon = nativeImage.createFromPath(iconPath);
trayIcon = trayIcon.resize({
  width: 16,
  height: 16
});

function createTray() {
  tray = new Tray(trayIcon)
  tray.setToolTip('BCS Backups')

  tray.setContextMenu(trayMenu)
}


function createWindow() {
  createTray()
  // Cria uma janela de navegação.
  win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true
    },
    autoHideMenuBar: true
  })

  // e carrega o arquivo index.html do seu aplicativo.
  win.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  )

  // Abrir o DevTools (aba de ferramentas para desenvolvedores).
  //win.webContents.openDevTools()
  
  win.on('close', (e) => {
    if (win.isVisible()) {
      e.preventDefault()
      win.hide()
    }
  })

}


// Este método será chamado quando Electron terminar de inicializar
// e também estiver pronto para criar novas janelas do navegador.
// Algumas APIs podem ser usadas somente depois que este evento ocorre.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Nesse arquivo, você pode incluir o resto do código principal
// de processos do seu aplicativo.
// Você também pode colocar eles em arquivos separados e requeridos-as aqui.
