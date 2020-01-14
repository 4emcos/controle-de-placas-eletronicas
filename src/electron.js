const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const isDev = require('electron-is-dev');


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
        //frame: false,
        titleBarStyle: 'hidden' ,
        width: 2000, 
        height: 1200});
  mainWindow.loadURL(isDev ? 'http://132.1.6.117:3000' : `file://${path.join(__dirname, '../public/index.html')}`);
  if (isDev) {
    // Open the DevTools.
    //BrowserWindow.addDevToolsExtension('<location to your react chrome extension>');
    //mainWindow.webContents.openDevTools();
  }
  mainWindow.on('closed', () => mainWindow = null);
}




app.on('ready', () => {{
    createWindow()    
     

}})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});