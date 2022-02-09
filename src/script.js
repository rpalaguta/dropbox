import { getPhotos, getPhoto, patchPhoto, deletePhoto, postPhoto, deletePhotos } from "./photos_helper.js";
import { onError } from './event_helpers.js';

let selectedPhotos = [];
let photos = await getPhotos(100);
render(photos);

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('popup').style.display = 'none';
});

document.getElementById('upload').addEventListener('change', async function () {
  for (let i = 0; i < this.files.length; i++) {
    const file = this.files[i];
    const formData = new FormData();
    formData.append('file', file, file.name);
    try {
      const createdItem = await postPhoto(formData);
      photos.unshift(createdItem);
    } catch (error) {
      onError(error.message);
    }
  }
  render(photos);
});

document.getElementById('delete').addEventListener('click', async function () {
  // try {
  photos = await deletePhotos(selectedPhotos);
  render(photos);
  // } catch (error) {
  //   console.log(error);
  //   onError(error.message);
  // }
});

function render(arr) {
  let sizeSum = 0;
  document.getElementById('content').innerHTML = '';
  arr?.forEach((element) => {
    sizeSum += element.size;
    const imageItem = document.createElement('div');
    const image = document.createElement('div');
    const checked = document.createElement('div');
    const mark = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const editBtn = document.createElement('i');
    editBtn.className = 'fa fa-pencil-square-o';
    h2.textContent = element.title;
    h3.textContent = convertBytes(element.size) + ' MB';
    h3.appendChild(editBtn);
    h3.setAttribute('style', 'display: flex; justify-content: space-between;');
    h3.addEventListener('click', function () {
      editPhoto(element.id);
    });

    mark.setAttribute('src', 'img/mark.png');
    imageItem.className = 'uploaded';
    image.className = 'uploaded-img';
    checked.className = 'checked';
    mark.className = 'check-mark';
    image.setAttribute('style', `background-image: url(${element.url})`);
    imageItem.appendChild(image);
    image.appendChild(checked);
    checked.appendChild(mark);
    imageItem.appendChild(h2);
    imageItem.appendChild(h3);
    imageItem.setAttribute('id', element.id);
    document.getElementById('content').appendChild(imageItem);

    imageItem.addEventListener('click', function () {
      checked.classList.toggle('active');
      if (selectedPhotos.includes(element.id)) {
        const indexOf = selectedPhotos.indexOf(element.id);
        selectedPhotos.splice(indexOf, 1);
      } else {
        selectedPhotos.push(element.id);
      }
    });

    imageItem.addEventListener('dblclick', function () {
      showPopup(this.id);
    })
  });
  // console.log(images);
  document.getElementById('capacity').textContent = `${convertBytes(sizeSum)} / 100 MB`;
  document.getElementById('capValue').value = convertBytes(sizeSum);
  console.log(convertBytes(sizeSum));
};

async function showPopup(id) {
  try {
    const photoPreview = document.getElementById('photoPreview');
    photoPreview.innerHTML = '';
    document.getElementById('popup').style.display = 'flex';
    const photo = await getPhoto(id);
    photoPreview.innerHTML = `<img src="${photo.url}" alt="img" />`
  } catch (error) {
    onError(error.message);
  }
}

async function editPhoto(id) {
  try {
    const photoPreview = document.getElementById('photoPreview');
    photoPreview.innerHTML = '';
    document.getElementById('popup').style.display = 'flex';
    const photo = await getPhoto(id);
    photoPreview.innerHTML = `
      <img src="${photo.url}" alt="img" />
      <div class="photo-edit-form flex justify-between">
        <input id="titleInput" type="text" value="${photo.title}" />
        <button id="updateBtn" type="button">Update title</button>
      </div>
    `;
    document.getElementById('updateBtn').addEventListener('click', async function () {
      try {
        const title = document.getElementById('titleInput').value;
        await patchPhoto(id, { title });
        document.getElementById('popup').style.display = 'none';
        photos = await getPhotos(100);
        render(photos);
      } catch (e) {
        console.log(e);
      }
    });
  } catch (error) {
    onError(error.message);
  }
}

function convertBytes(bytes) {
  return (bytes / 1048576).toFixed(2);
}