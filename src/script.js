import { getPhotos, getPhoto, patchPhoto, deletePhoto, postPhoto } from "./photos_helper.js";

const photos = await getPhotos(100);
render(photos);

document.getElementById('upload').addEventListener('change', async function () {
  for (let i = 0; i < this.files.length; i++) {
    const file = this.files[i];
    const data = {
      albumId: 1,
      title: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      date: moment().format('YYYY-MM-DD HH:mm')
    };
    const createdItem = await postPhoto(data);
    photos.unshift(createdItem);
  }
  render(photos);
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
      if (delList.includes(this.id)) {
        const indexOf = delList.indexOf(checked.id);
        delList.splice(indexOf, 1);
      } else {
        delList.push(this.id);
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