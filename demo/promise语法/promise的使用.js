const fs = require('fs')
const promise = new Promise((resolve, reject) => {
  fs.readFile('a.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const promise2 = new Promise((resolve, reject) => {
  fs.readFile('b.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

const promise3 = new Promise((resolve, reject) => {
  fs.readFile('c.txt', 'utf-8', (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

// 如果声明多个promise，可以使用链式编程

promise.then(res => {
  console.log(res)
  return promise2
}).then(res => {
  console.log(res)
  return promise3
}).then(res => {
  console.log(res)
})
