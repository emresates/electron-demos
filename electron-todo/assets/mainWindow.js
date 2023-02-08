const electron = require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('todo:addItem', (e, todo) => {
  // Container
  const container = document.querySelector('.todo-container');

  // row
  const row = document.createElement('div');
  row.className = 'row';

  // col
  const col = document.createElement('div');
  col.className =
    'bg-info p-2 mb-3 text-light bg-dark col-md-8 offset-2 shadow card d-flex justify-content-center flex-row align-items-center';

  // p
  const p = document.createElement('p');
  p.className = 'm-0 w-100';
  p.innerText = todo.text;

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-outline-danger flex-shrink-1 ms-1';
  deleteBtn.innerText = 'X';

  deleteBtn.addEventListener('click', () => {
    if (confirm('Bu kaydı silmek istediğinden emin misin ? ')) {
    }
  });

  col.appendChild(p);
  col.appendChild(deleteBtn);

  row.appendChild(col);

  container.appendChild(row);
});
