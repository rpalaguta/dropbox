// CRUD = Create Read Update Delete

const API_URL = 'http://localhost:5000';

// export function getPhotosAsync() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const data = await fetch(`${API_URL}/photos`);
//       return resolve(data.json());
//     } catch (error) {
//       reject(error);
//     }
//   });
// }

// Read
export async function getPhotos(count) {
  try {
    const res = await axios.get(`${API_URL}/photos?limit=${count}`);
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
    const res = await axios.post(`${API_URL}/photos`, data);
    return res.data;
  } catch (e) {
    return e;
  }
}
// export async function getPhoto(id) {
//   const data = await fetch(`${API_URL}/photos/${id}`);
//   return await data.json();
// }

// // Create
// export async function createPhoto(data) {
//   const data_1 = await fetch(`${API_URL}/photos`, {
//     method: 'POST',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   return await data_1.json();
// }

// // Update
// export async function patchPhoto(id, data) {
//   try {
//     const data_1 = await fetch(`${API_URL}/photos/${id}`, {
//       method: 'PATCH',
//       data: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json'
//       },
//     });
//     return await data_1.json();
//   } catch (err) {
//     return console.log(err);
//   }
// }

// // Delete
// export async function deletePhoto(id, data) {
//   const data_1 = await fetch(`${API_URL}/photos/${id}`, {
//     method: 'DELETE',
//     body: JSON.stringify(data),
//     headers: {
//       'Content-Type': 'application/json'
//     },
//   });
//   return await data_1.json();
// }
