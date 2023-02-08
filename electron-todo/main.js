const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu, ipcMain } = require('electron');
const { BrowserWindow, app } = electron;

let mainWindow;

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`),
});

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    // frame: false, //Çerçeveyi kaldırır
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.setResizable(false);

  //* Pencere oluşturulması
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'pages/mainWindow.html'),
      protocol: 'file:', //dosya
      slashes: true, // slash ayırt etme
    })
  );

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const mainMenuTemplate = [
  {
    label: 'Dosya',
    submenu: [
      {
        label: 'Yeni Todo Ekle',
        click() {
          createWindow();
        },
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
    label: 'Dev Tools',
    submenu: [
      {
        label: 'DevTools Settings',
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
    width: 488,
    height: 240,
    title: 'New Window',
  });

  addWindow.setResizable(false);

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'pages/newTodo.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  addWindow.on('close', () => {
    addWindow = null;
  });
}
