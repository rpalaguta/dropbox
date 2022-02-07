import { onSearch } from './event_helpers.js';
import { getUsers, getUser, createUser, patchUser, deleteUser } from './users_helpers.js'

let data = [];

document.getElementById('search').addEventListener('input', (e) => onSearch(e, data, ['name', 'username', 'email'], renderTable));
document.getElementById('add-user').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'flex';
  showUserForm({});
});

async function loadData() {
  data = await getUsers();
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

async function userEvent(type, id) {
  switch (type) {
    case 'view':
      getUser(id)
        .then(res => renderUserData(res))
      break;
    case 'edit':
      getUser(id)
        .then(res => showUserForm(res, true))
      break;
    case 'delete':
      const confirmRes = confirm('Are you sure to delete this user?');
      if (confirmRes) {
        try {
          await deleteUser(id);
          data = data.filter(item => item.id !== id);
          renderTable(data);
        } catch (error) {
          console.log(error);
        }
      }
      break;
    default:
      break;
  }
}



function showUserForm({
  id,
  name,
  username,
  email,
  phone,
  website,
  address,
  company,
},
  isEditForm,
) {
  document.getElementById('userData').innerHTML = `
    <h4>Personal data</h4>
    <div class="form-item">
      <label for="name">Name</label>
      <input type="text" id="name" value=${isEditForm ? name : ''}>
    </div>
    <div class="form-item">
      <label for="username">Username</label>
      <input type="text" id="username" value=${isEditForm ? username : ''}>
    </div>
    <div class="form-item">
      <label for="email">Email</label>
      <input type="email" id="email" value=${isEditForm ? email : ''}>
    </div>
    <div class="form-item">
      <label for="phone">Phone</label>
      <input type="phone" id="phone" value=${isEditForm ? phone : ''}>
    </div>
    <div class="form-item">
      <label for="website">Website</label>
      <input type="texts" id="website" value=${isEditForm ? website : ''}>
    </div>
    <h4>Address</h4>
    <address>
      <div class="form-item">
        <label for="street">Street</label>
        <input type="text" id="street" value=${isEditForm ? address?.street : ''}>
      </div>
        <div class="form-item">
          <label for="suite">Suite</label>
          <input type="text" id="suite" value=${isEditForm ? address?.suite : ''}>
        </div>
        <div class="form-item">
          <label for="city">City</label>
          <input type="text" id="city" value=${isEditForm ? address?.city : ''}>
        </div>
        <div class="form-item">
          <label for="zipcode">Zipcode</label>
          <input type="text" id="zipcode" value=${isEditForm ? address?.zipcode : ''}>
        </div>
      </address>
      <h4>Company</h4>
      <div class="form-item">
        <label for="companyName">Name</label>
        <input type="text" id="companyName" value=${isEditForm ? company?.name : ''}>
      </div>
      <div class="form-item">
        <label for="catchPhrase">Catch Phrase</label>
        <input type="text" id="catchPhrase" value=${isEditForm ? company?.catchPhrase : ''}>
      </div>
      <div class="form-item">
        <label for="bs">BS</label>
        <input type="text" id="bs" value=${isEditForm ? company?.bs : ''}>
      </div>
      <button type="button" id="submitBtn">${isEditForm ? 'Update User' : 'Create User'}</button>
  `;
  document.getElementById('submitBtn').addEventListener('click', async function () {
    const newData = {
      "name": document.getElementById('name').value,
      "username": document.getElementById('username').value,
      "email": document.getElementById('email').value,
      "address": {
        "street": document.getElementById('street').value,
        "suite": document.getElementById('suite').value,
        "city": document.getElementById('city').value,
        "zipcode": document.getElementById('zipcode').value,
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      "phone": document.getElementById('phone').value,
      "website": document.getElementById('website').value,
      "company": {
        "name": document.getElementById('companyName').value,
        "catchPhrase": document.getElementById('catchPhrase').value,
        "bs": document.getElementById('bs').value
      }
    };
    if (isEditForm) {
      const updatedUser = await patchUser(id, newData);
      data = data.map(item => item.id === id ? updatedUser : item);
    } else {
      const createdUser = await createUser(newData);
      data.unshift(createdUser);
    }
    renderTable(data);
    document.getElementById('popup').style.display = 'none';
  })
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