// import data from "./data.js";

// function render() {
//   for (let arrItem = 0; arrItem < data.length; arrItem++) {
//     const element = data[arrItem];
//     document.getElementById("content").innerHTML += `
//             <div id="uploaded-img">
//             <div class="uploaded-img" style="background-image:url(${element.url})">
//                 <div id="checked" class="">
//                 <img class="check-mark" src="img/mark.png" alt="" srcset="" />
//                 </div>
//             </div>
//             <h2>${element.title}</h2>
//             <h3>${element.size}</h3>
//             <h4>${element.date}</h4>
//             </div>`;
//   }
// }
// render();
let images = [];
var upload = document.getElementById('upload');
let delList = [];

upload.onchange = function (e) {
  for (let i = 0; i < upload?.files?.length; i++) {
    const element = upload?.files[i];
    images.push({
      name: element.name,
      size: element.size,
      date: element.lastModifiedDate.getTime(),
      path: URL.createObjectURL(element),
    });
  }
  render(images);
};

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
    h2.textContent = element.name;
    h3.textContent = convertBytes(element.size) + ' MB';
    h4.textContent = element.date;
    mark.setAttribute('src', 'img/mark.png');
    imageItem.className = 'uploaded';
    image.className = 'uploaded-img';
    checked.className = 'checked';
    mark.className = 'check-mark';
    image.setAttribute('style', `background-image: url(${element.path})`);
    imageItem.appendChild(image);
    image.appendChild(checked);
    checked.appendChild(mark);
    imageItem.appendChild(h2);
    imageItem.appendChild(h3);
    imageItem.appendChild(h4);
    imageItem.setAttribute('id', index);
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

render(images);

document.getElementById('delete').addEventListener('click', function () {
  images = images.filter((item, index) => !delList.includes(index.toString()));
  delList = [];
  render(images);
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
