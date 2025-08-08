let bucketList = JSON.parse(localStorage.getItem('bucketList')) || [];

function saveList() {
  localStorage.setItem('bucketList', JSON.stringify(bucketList));
}

function updateStats() {
  const total = bucketList.length;
  const completed = bucketList.filter(item => item.done).length;
  document.getElementById('total').innerText = total;
  document.getElementById('completed').innerText = completed;
  const progress = total === 0 ? 0 : (completed / total) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
}

function renderList() {
  const list = document.getElementById('bucket-list');
  list.innerHTML = '';
  bucketList.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.done ? 'completed' : '';
    li.innerHTML = `
      <span>${item.text}</span>
      <div class="btns">
        <i class="fa-solid fa-check" title="Mark as Done" onclick="toggleDone(${index})"></i>
        <i class="fa-solid fa-trash" title="Delete" onclick="deleteItem(${index})"></i>
      </div>
    `;
    list.appendChild(li);
  });
  updateStats();
}

function addItem() {
  const input = document.getElementById('item-input');
  const text = input.value.trim();
  if (text) {
    bucketList.push({ text, done: false });
    saveList();
    renderList();
    input.value = '';
  }
}

function toggleDone(index) {
  bucketList[index].done = !bucketList[index].done;
  saveList();
  renderList();
}

function deleteItem(index) {
  bucketList.splice(index, 1);
  saveList();
  renderList();
}

renderList();
