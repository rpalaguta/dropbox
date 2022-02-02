import { onSearch } from './event_helpers.js';
import { getUsers, getUser, createUser, patchUser, deleteUser } from './users_helpers.js'
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
  let heading_5 = document.createElement('th');
  heading_5.innerHTML = 'Actions';
  row_1.appendChild(heading_1);
  row_1.appendChild(heading_2);
  row_1.appendChild(heading_3);
  row_1.appendChild(heading_4);
  row_1.appendChild(heading_5);
  thead.appendChild(row_1);
  table.appendChild(thead);
  table.appendChild(tbody);
  arr.forEach((element, id) => {
    const row = document.createElement('tr');
    table.appendChild(row);
    const number = document.createElement('td');
    number.innerHTML = `${element.id}`;
    row.appendChild(number);
    const name = document.createElement('td');
    name.innerHTML = `${element.name}`;
    row.appendChild(name);
    const userName = document.createElement('td');
    userName.innerHTML = `${element.username}`;
    row.appendChild(userName);
    const email = document.createElement('td');
    email.innerHTML = `${element.email}`;
    row.appendChild(email);
    const actions = document.createElement('td');

    const iconEye = document.createElement('i');
    iconEye.setAttribute('class', 'fa fa-eye');
    const iconEdit = document.createElement('i');
    iconEdit.setAttribute('class', 'fa fa-pencil-square-o');
    const iconDelete = document.createElement('i');
    iconDelete.setAttribute('class', 'fa fa-trash');

    iconEye.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'flex';
      userEvent('view', element.id);
    });
    iconEdit.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'flex';
      userEvent('edit', element.id);
    });
    iconDelete.addEventListener('click', function () {
      userEvent('delete', element.id);
    });

    actions.appendChild(iconEye);
    actions.appendChild(iconEdit);
    actions.appendChild(iconDelete);
    row.appendChild(actions);
  });
  document.getElementById('content').appendChild(table);
}

function userEvent(type, id) {
  console.log(type, id);
  switch (type) {
    case 'view':
      getUser(id)
        .then(res => renderUserData(res))
      break;
    case 'edit':
      break;
    case 'delete':
      break;
    default:
      break;
  }
}

function renderUserData({
  id,
  name,
  username,
  email,
  phone,
  website,
  address: {
    street,
    suite,
    city,
    zipcode,
  },
  company: {
    name: companyName,
    catchPhrase,
    bs,
  }
}) {
  document.getElementById('userData').innerHTML = `
    <div class="user-data">
      <div>
        <h6>PERSONAL DATA</h6>
        <div>ID: ${id}</div>
        <div>NAME: ${name}</div>
        <div>USERNAME: ${username}</div>
        <div>EMAIL: ${email}</div>
        <div>PHONE: ${phone}</div>
        <div>WEBSITE: ${website}</div>
      </div>
      <div>
        <h6>ADDRESS</h6>
        <div>STREET: ${street}</div>
        <div>SUITE: ${suite}</div>
        <div>CITY: ${city}</div>
        <div>ZIPCODE: ${zipcode}</div>
      </div>
      <div>
        <h6>COMPANY</h6>
        <div>NAME: ${companyName}</div>
        <div>CATCH PHRASE: ${catchPhrase}</div>
        <div>BS: ${bs}</div>
      </div>
    </div>
  `;

}

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('userData').innerHTML = '';
})