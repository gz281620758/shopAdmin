const fs = require('fs')
function read (pathname) {
  return new Promise((resolve, reject) => {
    fs.readFile(pathname, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

read('a.txt').then(res => {
  console.log(res)
  return read('b.txt')
}
).then(res => {
  console.log(res)
  return read('c.txt')
}).then(res => {
  console.log(res)
})
