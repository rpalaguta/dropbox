// CRUD = Create Read Update Delete

const API_URL = 'https://jsonplaceholder.typicode.com';

// Read
export async function getUsers() {
  // return fetch(`${API_URL}/users`)
  //   .then(data => data.json());
  try {
    const res = await axios.get(`${API_URL}/users`);
    return res.data;
  } catch (error) {
    return error;
  }
}

export async function getUser(id) {
  // return fetch(`${API_URL}/users/${id}`)
  //   .then(data => data.json());
  try {
    const res = await axios.get(`${API_URL}/users/${id}`);
    return res.data;
  } catch (error) {
    return error;
  }
}

// Create
export async function createUser(data) {
  // return fetch(`${API_URL}/users`, {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // }).then(data => data.json());
  try {
    const res = await axios.post(`${API_URL}/users`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}

// Update
export async function patchUser(id, data) {
  // return fetch(`${API_URL}/users/${id}`, {
  //   method: 'PATCH',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // }).then(data => data.json());
  try {
    const res = await axios.patch(`${API_URL}/users/${id}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}

// Delete
export async function deleteUser(id, data) {
  // return fetch(`${API_URL}/users/${id}`, {
  //   method: 'DELETE',
  //   body: JSON.stringify(data),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  // }).then(data => data.json());
  try {
    const res = await axios.delete(`${API_URL}/users/${id}`, data);
    return res.data;
  } catch (error) {
    return error;
  }
}