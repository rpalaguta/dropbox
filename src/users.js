import { onSearch } from './event_helpers.js';
// import { getPosts, deletePost, getPost, createPost, patchPost } from './posts_helpers.js';

// let table = document.createElement('table');
// let thead = document.createElement('thead');
// let tbody = document.createElement('tbody');

// table.appendChild(thead);
// table.appendChild(tbody);

// document.getElementById('content').appendChild(table);
// let users = getPosts();
// console.log(users);

// const API_URL = 'https://jsonplaceholder.typicode.com';
// function getPosts(id) {
//   return fetch(`${API_URL}/users/${id}`).then((data) => data.json());
// }

// getPosts(1)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

let data = [];

// function onSearch(e) {
//   const filteredData = data.filter((item) => {
//     return item.name.includes(e.target.value)
//       || item.id.toString().includes(e.target.value)
//       || item.username.includes(e.target.value)
//       || item.email.includes(e.target.value)
//   });
//   console.log(e.target.value, filteredData);
//   renderTable(filteredData);
// }

document.getElementById('search').addEventListener('input', (e) => onSearch(e, data, ['name', 'username', 'email'], renderTable))

async function loadData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  data = await response.json();
  renderTable(data);
}
loadData();

function renderTable(arr) {
  document.getElementById('content').innerHTML = '';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = 'ID';
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = 'Name';
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = 'User name';
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = 'Email';
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  arr.forEach((element, id) => {
    const row = document.createElement('tr');
    table.appendChild(row);
    let number = document.createElement('td');
    number.innerHTML = `${element.id}`;
    row.appendChild(number);
    let name = document.createElement('td');
    name.innerHTML = `${element.name}`;
    row.appendChild(name);
    let userName = document.createElement('td');
    userName.innerHTML = `${element.username}`;
    row.appendChild(userName);
    let email = document.createElement('td');
    email.innerHTML = `${element.email}`;
    row.appendChild(email);
  });
  document.getElementById('content').appendChild(table);
}
