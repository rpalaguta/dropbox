import { onSearch } from './event_helpers.js';
import { getUsers, getUser, createUser, patchUser, deleteUser } from './users_helpers.js';

let data = [];

document
  .getElementById('search')
  .addEventListener('input', (e) => onSearch(e, data, ['name', 'username', 'email'], renderTable));

getUsers().then((res) => {
  data = res;
  renderTable(res);
});

// Render table
function renderTable(arr) {
  document.getElementById('content').innerHTML = '';
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  let row_1 = document.createElement('tr');
  let heading_1 = document.createElement('th');
  heading_1.innerHTML = 'Actions';
  let heading_2 = document.createElement('th');
  heading_2.innerHTML = 'ID';
  let heading_3 = document.createElement('th');
  heading_3.innerHTML = 'Name';
  let heading_4 = document.createElement('th');
  heading_4.innerHTML = 'User name';
  let heading_5 = document.createElement('th');
  heading_5.innerHTML = 'Email';
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
    let delUser = document.createElement('i');
    let viewUser = document.createElement('i');
    let editUser = document.createElement('i');
    delUser.setAttribute('class', 'fas fa-ban', 'id', `id`);
    delUser.setAttribute('id', `ban${element.id}`);
    viewUser.setAttribute('class', 'far fa-eye');
    viewUser.setAttribute('id', `view${element.id}`);
    editUser.setAttribute('class', 'fas fa-user-edit');
    editUser.setAttribute('id', `edit${element.id}`);
    delUser.addEventListener('click', function () {
      console.log('ban', element.id);
    });
    viewUser.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'flex';
      userEvent('view', element.id);
      // console.log(document.getElementById('pop-up'));
    });
    editUser.addEventListener('click', function () {
      document.getElementById('popup').style.display = 'flex';
      userEvent('edit', element.id);
    });
    let actions = document.createElement('td');
    actions.appendChild(delUser);
    actions.appendChild(viewUser);
    actions.appendChild(editUser);
    row.appendChild(actions);
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
    document.getElementById('content').appendChild(table);
  });
}

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('userData').innerHTML = '';
});

function userEvent(type, id) {
  console.log(type, id);
  switch (type) {
    case 'view':
      getUser(id).then((res) => renderUserData(res));
      break;
    case 'edit':
      getUser(id).then((res) => editUserData(res));
      break;
    case 'delete':
      break;
    default:
      break;
  }
}

// View User data
function renderUserData({
  id,
  name,
  username,
  email,
  phone,
  website,
  address: { street, suite, city, zipcode },
  company: { name: companyName, catchPhrase, bs },
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

// Edit User data
function editUserData({
  id,
  name,
  username,
  email,
  phone,
  website,
  address: { street, suite, city, zipcode },
  company: { name: companyName, catchPhrase, bs },
}) {
  document.getElementById('userData').innerHTML = `
    <div class="user-data">
      <div>
        <h6>PERSONAL DATA</h6>
        <div>ID: ${id}</div>
        <div><h4>Name: </h4><input type="text" placeholder="${name}" value="${name}" id="updateName"></div>
        <div><h4>User Name: </h4><input type="text" placeholder="${username}" value="${username}" id="updateUserName"></div>
        <div><h4>Email: </h4><input type="text" placeholder="${email}" value="${email}" id="updateEmail"></div>
        <div><h4>Phone number: </h4><input type="text" placeholder="${phone}" value="${phone}" id="updatePhone"></div>
        <div><h4>Website: </h4><input type="text" placeholder="${website}" value="${website}" id="updateWebsite"></div>
      </div>
      <div>
        <h6>ADDRESS</h6>
        <div><h4>Street: </h4><input type="text" placeholder="${street}" value="${street}" id="updateStreet"></div>
        <div><h4>Suite: </h4><input type="text" placeholder="${suite}" value="${suite}" id="updateSuite"></div>
        <div><h4>City: </h4><input type="text" placeholder="${city}" value="${city}" id="updateCity"></div>
        <div><h4>Zipcode: </h4><input type="text" placeholder="${zipcode}" value="${zipcode}" id="updateZipcode"></div>
      </div>
      <div>
        <h6>COMPANY</h6>
        <div><h4>Company Name: </h4><input type="text" placeholder="${companyName}" value="${companyName}" id="updateCompanyName"></div>
        <div><h4>Catch Phrase: </h4><input type="text" placeholder="${catchPhrase}" value="${catchPhrase}" id="updateCatchPhrase"></div>
        <div><h4>BS: </h4><input type="text" placeholder="${bs}" value="${bs}" id="updateBs"></div>
        <div><button id="submitEdit" type="submit">Save Changes</button></div>
      </div>
    </div>
  `;
  document.getElementById('submitEdit').addEventListener('click', function () {
    const userEdit = {
      name: document.getElementById('updateName').value,
      username: document.getElementById('updateUserName').value,
      email: document.getElementById('updateEmail').value,
      phone: document.getElementById('updatePhone').value,
      website: document.getElementById('updateWebsite').value,
      address: {
        street: document.getElementById('updateStreet').value,
        suite: document.getElementById('updateSuite').value,
        city: document.getElementById('updateCity').value,
        zipcode: document.getElementById('updateZipcode').value,
      },
      company: {
        name: document.getElementById('updateCompanyName').value,
        catchPhrase: document.getElementById('updateCatchPhrase').value,
        bs: document.getElementById('updateBs').value,
      },
    };
    patchUser(id, userEdit).then((res) => {
      const updatedData = data.map((item) => (item.id === res.id ? res : item));
      renderTable(updatedData);
      console.log(updatedData);
    });
    document.getElementById('popup').style.display = 'none';
    // document.getElementById('userData').innerHTML = '';
  });
}

document.getElementById('addNewUser').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'flex';
  createNewUser();
});

// Delete User

// Create new user
function createNewUser() {
  document.getElementById('userData').innerHTML = `
    <div class="user-data">
      <div>
        <h6>PERSONAL DATA</h6>
        <div><h4>Name: </h4><input type="text" placeholder="Name" value="Name" id="updateName"></div>
        <div><h4>User Name: </h4><input type="text" placeholder="User name" value="User name" id="updateUserName"></div>
        <div><h4>Email: </h4><input type="text" placeholder="Email" value="Email" id="updateEmail"></div>
        <div><h4>Phone number: </h4><input type="text" placeholder="Phone number" value="Phone number" id="updatePhone"></div>
        <div><h4>Website: </h4><input type="text" placeholder="Website" value="Website" id="updateWebsite"></div>
      </div>
      <div>
        <h6>ADDRESS</h6>
        <div><h4>Street: </h4><input type="text" placeholder="Street" value="Street" id="updateStreet"></div>
        <div><h4>Suite: </h4><input type="text" placeholder="Suite" value="Suite" id="updateSuite"></div>
        <div><h4>City: </h4><input type="text" placeholder="City" value="City" id="updateCity"></div>
        <div><h4>Zipcode: </h4><input type="text" placeholder="Zipcode" value="Zipcode" id="updateZipcode"></div>
      </div>
      <div>
        <h6>COMPANY</h6>
        <div><h4>Company Name: </h4><input type="text" placeholder="Compamny name" value="Compamny name" id="updateCompanyName"></div>
        <div><h4>Catch Phrase: </h4><input type="text" placeholder="Catch phrase" value="Catch phrase" id="updateCatchPhrase"></div>
        <div><h4>BS: </h4><input type="text" placeholder="BS" value="BS" id="updateBs"></div>
        <div><button id="submitEdit" type="submit">Save Changes</button></div>
      </div>
    </div>
  `;
  document.getElementById('submitEdit').addEventListener('click', function () {
    const userEdit = {
      name: document.getElementById('updateName').value,
      username: document.getElementById('updateUserName').value,
      email: document.getElementById('updateEmail').value,
      phone: document.getElementById('updatePhone').value,
      website: document.getElementById('updateWebsite').value,
      address: {
        street: document.getElementById('updateStreet').value,
        suite: document.getElementById('updateSuite').value,
        city: document.getElementById('updateCity').value,
        zipcode: document.getElementById('updateZipcode').value,
      },
      company: {
        name: document.getElementById('updateCompanyName').value,
        catchPhrase: document.getElementById('updateCatchPhrase').value,
        bs: document.getElementById('updateBs').value,
      },
    };
    createUser(userEdit).then((res) => {
      console.log(userEdit);
      getUsers().then((res) => {
        data = res;
        renderTable(res);
      });
    });
    document.getElementById('popup').style.display = 'none';
    document.getElementById('userData').innerHTML = '';
  });
}
