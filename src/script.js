import { getPhotos, getPhoto, patchPhoto, deletePhoto, postPhoto } from "./photos_helper.js";

const selectedPhotos = [];
const photos = await getPhotos(100);
render(photos);

document.getElementById('upload').addEventListener('change', async function () {
  for (let i = 0; i < this.files.length; i++) {
    const file = this.files[i];
    const formData = new FormData();
    formData.append('file', file, file.name);
    const createdItem = await postPhoto(formData);
    photos.unshift(createdItem);
  }
  render(photos);
});

document.getElementById('delete').addEventListener('click', function () {
  console.log(selectedPhotos);
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
    h2.textContent = element.title;
    h3.textContent = convertBytes(element.size) + ' MB';
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
      if (selectedPhotos.includes(this.id)) {
        const indexOf = selectedPhotos.indexOf(checked.id);
        selectedPhotos.splice(indexOf, 1);
      } else {
        selectedPhotos.push(this.id);
      }
    });
  });
  // console.log(images);
  document.getElementById('capacity').textContent = `${convertBytes(sizeSum)} / 100 MB`;
  document.getElementById('capValue').value = convertBytes(sizeSum);
  console.log(convertBytes(sizeSum));
};

function convertBytes(bytes) {
  return (bytes / 1048576).toFixed(2);
}