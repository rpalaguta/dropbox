export function onSearch(e, data, keys, callback) {
  const value = e.target?.value?.toLowerCase();
  const filteredData = data.filter((item) => {
    let toPass = false;
    for (let key of keys) {
      if (item[key]?.toLowerCase()?.includes(value)) {
        toPass = item[key]?.toLowerCase()?.includes(value);
      }
    }
    return toPass;
  });
  callback(filteredData);
}

export function onError(message) {
  const alert = document.getElementById('alert');
  alert.style.display = 'block';
  alert.innerText = message;

  setTimeout(() => {
    alert.style.display = 'none';
  }, 15000)
}