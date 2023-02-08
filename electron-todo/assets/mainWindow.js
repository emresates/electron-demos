const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('todo:addItem', (e, todoItems) => {
  console.log(todoItems);
});
