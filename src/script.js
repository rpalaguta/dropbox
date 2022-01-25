import data from "./data.js";

function render() {
  for (let arrItem = 0; arrItem < data.length; arrItem++) {
    const element = data[arrItem];
    document.getElementById("content").innerHTML += `
            <div id="uploaded-img">
            <div class="uploaded-img" style="background-image:url(${element.url})">
                <div id="checked" class="">
                <img class="check-mark" src="img/mark.png" alt="" srcset="" />
                </div>
            </div>
            <h2>${element.title}</h2>
            <h3>${element.size}</h3>
            <h4>${element.date}</h4>
            </div>`;
  }
}
render();
