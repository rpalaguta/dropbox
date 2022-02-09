import { getPhotos, getPhoto, patchPhoto, deletePhoto, postPhoto } from '/photos_helper.js';

const photos = await getPhotos(20);
console.log({ photos });

let images = [];
var upload = document.getElementById('upload');
let delList = [];

// upload.onchange = async function (e) {
//   for (let i = 0; i < upload?.files?.length; i++) {
//     const element = upload?.files[i];
//     const data = {
//       title: element.name,
//       size: element.size,
//       date: moment().format('MMMM Do YYYY, h:mm:ss'),
//       url: URL.createObjectURL(element),
//     };
//     let createdelement = await postPhoto(data);
//     console.log(createdelement);
//   }
//   // render(images);
// };

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

const render = (arr) => {
  let sizeSum = 0;
  document.getElementById('content').innerHTML = '';
  arr?.forEach((element, index) => {
    sizeSum += element.size;
    const imageItem = document.createElement('div');
    const image = document.createElement('div');
    const checked = document.createElement('div');
    const mark = document.createElement('img');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const h4 = document.createElement('h4');
    h2.textContent = element.title;
    h3.textContent = convertBytes(element.size) + ' MB';
    h4.textContent = element.date;
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
    imageItem.appendChild(h4);
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
      console.log(delList);
    });
    imageItem.addEventListener('dblclick', function () {
      const sphoto = getPhoto(this.id);
      document.getElementById('preview').style.display = 'flex';
      document.getElementById('previewImg').src = `${element.url}`;
    });
  });
  // console.log(images);
  document.getElementById('capacity').textContent = `${convertBytes(sizeSum)} / 1 GB`;
  document.getElementById('capValue').value = convertBytes(sizeSum);
  console.log(convertBytes(sizeSum));
};

// render(images);
render(photos);

document.getElementById('closePopup').addEventListener('click', function () {
  document.getElementById('preview').style.display = 'none';
  document.getElementById('previewImg').src = `#`;
});

document.getElementById('delete').addEventListener('click', async function () {
  delList?.forEach(async (id) => {
    await deletePhoto(id);
    delList = [];
  });
  // setTimeout(async () => {
  //   const newPhotos = await getPhotos(100);
  //   photos = newPhotos
  //   render(photos);

  // }) 1000;
});

function convertBytes(bytes) {
  return (bytes / 1048576).toFixed(2);
}

document.getElementById('sort-name').addEventListener('click', function () {
  images.sort(function (x, y) {
    let a = x.name.toUpperCase(),
      b = y.name.toUpperCase();
    return a == b ? 0 : a > b ? 1 : -1;
  });
  render(images);
});

document.getElementById('sort-size').addEventListener('click', function () {
  images.sort(function (x, y) {
    return x.size - y.size;
  });
  render(images);
});

document.getElementById('sort-modified').addEventListener('click', function () {
  images.sort(function (x, y) {
    let a = new Date(x.Date),
      b = new Date(y.Date);
    return a - b;
  });
  render(images);
});
