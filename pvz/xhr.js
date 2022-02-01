
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
// https://doc.oroinc.com/api/http-methods/
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

function sendRequest(method, url) {
  return new Promise((resolve, reject) => {
    try {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.open(method, url);
      xhr.onload = () => resolve(xhr.response);
      xhr.send();
    } catch (e) {
      return reject(xhr.response);
    }
  });
}

sendRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
  .then(parsedData => console.log(parsedData))
  .catch((err) => {
    console.log("ERR:", err);
  });




// function sendRequest(method, url) {
//   return new Promise((resolve, reject) => {
//     const requestURL = 'https://jsonplaceholder.typicode.com/posts';

//     const xhr = new XMLHttpRequest();

//     xhr.open(method, requestURL);

//     xhr.responseType = 'json';
//     xhr.onload = () => {
//       if (xhr.status >= 400) {
//         resolve(xhr.response)
//       } else {
//         resolve(xhr.response)
//       }
//       // console.log(xhr.response);
//       // console.log(JSON.parse(xhr.response));
//     }

//     xhr.onerror = () => {
//       reject(xhr.response)
//     }

//     xhr.send();
//   })
// }

// sendRequest('GET', 'https://jsonplaceholder.typicode.com/posts')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))