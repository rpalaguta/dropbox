// https://jsonplaceholder.typicode.com/
// https://axios-http.com/docs/intro

function sendRequest(url) {
  return fetch(url)
}

sendRequest('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(parsed => console.log(parsed))
  .catch(err => console.log(err))
