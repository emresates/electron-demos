const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu, ipcMain } = require('electron');
const { BrowserWindow, app } = electron;

let mainWindow;

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);
// Enable live reload for Electron too
require('electron-reload')(__dirname, {
  // Note that the path to electron may vary according to the main file
  electron: require(`${__dirname}/node_modules/electron`),
});

app.on('ready', () => {
  console.log('App is working');

  console.log(process.platform);
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:', //dosya
      slashes: true, // slash ayırt etme
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on('key', (err, data) => {
    console.log(data);
  });

  ipcMain.on('key:inputValue', (err, data) => {
    console.log(data);
  });

  //* New Window
  ipcMain.on('key:newWindow', () => {
    createWindow();
  });

  //* Main window kapatılırsa uygulama kapatılır
  mainWindow.on('close', () => {
    app.quit();
  });
});

const mainMenuTemplate = [
  {
    label: 'Dosya',
    submenu: [
      {
        label: 'Yeni Todo Ekle',
      },
      {
        label: 'Tümünü Sil',
      },
      {
        label: 'Çıkış',
        role: 'quit',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
      },
    ],
  },
];

//* Platform macOs ise Dosya ismini görüntülemek için
if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({
    label: app.getName(),
    role: 'TODO', //Tıklanabilir bir yapı
  });
}

//* Devtools Menu
if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'DevTools',
    submenu: [
      {
        label: 'DevTools Screen',
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: 'Refresh',
        role: 'reload',
      },
    ],
  });
}

function createWindow() {
  addWindow = new BrowserWindow({
    width: 482,
    height: 200,
    title: 'New Window',
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'modal.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  addWindow.on('close', () => {
    addWindow = null;
  });
}
