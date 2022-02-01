const promise = new Promise(function (resolve, reject) {
  try {
    // Async function
    // Code block

    const data = {};
    // resolve(data || 'Success message') => sekminga uzkalusa
    // reject() => err
  } catch (e) {
    return reject(e);
  }
});

