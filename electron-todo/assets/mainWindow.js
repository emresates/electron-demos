const electron = require('electron');
const { ipcRenderer } = electron;

checkTodoCount();

const todoValue = document.querySelector('#todoValue');

//* Add Todo With Enter Key
todoValue.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    ipcRenderer.send('newTodo:save', {
      ref: 'main',
      todoValue: e.target.value,
    });
    todoValue.value = '';
  }
});

//* Todo Add Button
document.querySelector('#addBtn').addEventListener('click', () => {
  ipcRenderer.send('newTodo:save', { ref: 'main', todoValue: todoValue.value });
  todoValue.value = '';
});

//* Todo quit button
document.querySelector('#closeBtn').addEventListener('click', () => {
  ipcRenderer.send('todo:close');
});

//* Todo Add Functions
ipcRenderer.on('todo:addItem', (e, todo) => {
  // Container
  const container = document.querySelector('.todo-container');

  // row
  const row = document.createElement('div');
  row.className = 'row';

  // col
  const col = document.createElement('div');
  col.className =
    'bg-info p-2 mb-3 text-light bg-dark col-md-12 shadow card d-flex justify-content-center flex-row align-items-center';

  // p
  const p = document.createElement('p');
  p.className = 'm-0 w-100';
  p.innerText = todo.text;

  // delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-outline-danger flex-shrink-1 ms-1';
  deleteBtn.innerText = 'X';

  deleteBtn.addEventListener('click', (e) => {
    if (confirm('Bu kaydı silmek istediğinden emin misin ? ')) {
      e.target.parentNode.parentNode.remove();
      checkTodoCount();
    }
  });

  col.appendChild(p);
  col.appendChild(deleteBtn);

  row.appendChild(col);

  container.appendChild(row);

  checkTodoCount();
});

//* Checkout sitution
function checkTodoCount() {
  const container = document.querySelector('.todo-container');
  const alertCon = document.querySelector('.alert-container');
  document.querySelector('.total-count-container').innerText =
    container.children.length;

  if (container.children.length !== 0) {
    alertCon.style.display = 'none';
  } else {
    alertCon.style.display = 'block';
  }
}
