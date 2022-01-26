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
var upload = document.getElementById("upload");

let selectedItems = [];

upload.onchange = function (e) {
  for (let i = 0; i < document.getElementById("upload")?.files.length; i++) {
    const element = document.getElementById("upload")?.files[i];
    images.push({
      name: element.name,
      size: element.size,
      date: element.lastModifiedDate,
      path: URL.createObjectURL(element),
    });
  }

  render(images);
};

const render = (arr) => {
  document.getElementById("content").innerHTML = '';
  arr?.forEach((element, index) => {
    const imageItem = document.createElement("div");

    const image = document.createElement("div");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    h2.textContent = element.name;
    h3.textContent = `${convertBytes(element.size)} MB`;
    h4.textContent = element.date;
    imageItem.className = "uploaded";
    image.className = "uploaded-img";
    image.setAttribute("style", `background-image: url(${element.path})`);
    imageItem.appendChild(image);
    imageItem.appendChild(h2);
    imageItem.appendChild(h3);
    imageItem.appendChild(h4);
    imageItem.setAttribute('id', index);
    const selectedDiv = document.createElement("div");
    selectedDiv.setAttribute('class', 'selected');
    imageItem.appendChild(selectedDiv);
    document.getElementById("content").appendChild(imageItem);

    imageItem.addEventListener('click', function () {
      this.classList.toggle('active');
      if (selectedItems.includes(this.id)) {
        const indexOf = selectedItems.indexOf(this.id);
        selectedItems.splice(indexOf, 1);
      } else {
        selectedItems.push(this.id);
      }
    });
  });
  getCapacity(arr);
};

render(images);

document.getElementById('delete').addEventListener('click', function () {
  images = images.filter((item, index) => !selectedItems.includes(index.toString()));
  console.log(selectedItems, images);
  selectedItems = [];
  render(images);
});

function convertBytes(bytes) {
  return (bytes / 1048576).toFixed(2);
}

function getCapacity(arr) {
  let capacityBytes = 0;
  for (let item of arr) {
    capacityBytes += item.size;
  }
  const capacityMb = convertBytes(capacityBytes);
  document.getElementById('capacityVal').textContent = `${capacityMb} MB / 100 MB`;
  document.getElementById('capacity').value = capacityMb;
}