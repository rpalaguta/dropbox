const API_URL = 'https://jsonplaceholder.typicode.com';

// Read
export function getUsers() {
  return fetch(`${API_URL}/users`).then((data) => data.json());
}

export function getUser(id) {
  return fetch(`${API_URL}/users/${id}`).then((data) => data.json());
}

// Create
export function createUser(data) {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}

// Update
export function patchUser(id, data) {
  return fetch(`${API_URL}/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}

// Delete
export function deleteUser(id, data) {
  return fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((data) => data.json());
}
