// CRUD = Create Read Update Delete

const API_URL = 'https://jsonplaceholder.typicode.com';

// Read
export function getPosts() {
  return fetch(`${API_URL}/posts`)
    .then(data => data.json());
}

export function getPost(id) {
  return fetch(`${API_URL}/posts/${id}`)
    .then(data => data.json());
}

// Create
export function createPost(data) {
  return fetch(`${API_URL}/posts`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

// Update
export function patchPost(id, data) {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}

// Delete
export function deletePost(id, data) {
  return fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(data => data.json());
}