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
const images = [];
var upload = document.getElementById("upload");

upload.onchange = function(e) { 
  const images2 = [];
  for (let i = 0; i < document.getElementById("upload")?.files.length; i++) {
    const element = document.getElementById("upload")?.files[i];
    images2.push({
      name: element.name,
      size: element.size,
      date: element.lastModifiedDate,
      path: URL.createObjectURL(element),
    });
  }
  render(images2);
};

const render = (arr) => {
  arr?.forEach((element) => {
    const imageItem = document.createElement("div");
    const image = document.createElement("div");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const h4 = document.createElement("h4");
    h2.textContent = element.name;
    h3.textContent = element.size;
    h4.textContent = element.date;
    imageItem.className = "uploaded";
    image.className = "uploaded-img";
    image.setAttribute("style", `background-image: url(${element.path})`);
    imageItem.appendChild(image);
    imageItem.appendChild(h2);
    imageItem.appendChild(h3);
    imageItem.appendChild(h4);
    document.getElementById("content").appendChild(imageItem);
  });
};

render(images);

document.getElementById('delete').addEventListener('click', function () {
  document.getElementById('content').removeChild(document.getElementById('content').childNodes[0]);
})
