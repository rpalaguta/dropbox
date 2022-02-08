// CRUD = Create Read Update Delete

const API_URL = 'http://localhost:5000';

// Read
export async function getPhotos(limit) {
  try {
    const res = await axios.get(`${API_URL}/photos?limit=${limit}`);
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function getPhoto(id) {
  try {
    const res = await axios.get(`${API_URL}/photos/${id}`);
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function patchPhoto(id, data) {
  try {
    const res = await axios.patch(`${API_URL}/photos/${id}`, data);
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function deletePhoto(id, data) {
  try {
    const res = await axios.delete(`${API_URL}/photos/${id}`, data);
    return res.data;
  } catch (e) {
    return e;
  }
}

export async function postPhoto(data) {
  try {
    const res = await axios.post(`${API_URL}/photos`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return res.data;
  } catch (e) {
    return e;
  }
}
