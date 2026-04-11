import fs from "node:fs"

//fs.writeFile("async.js", "Hello from async fs!" ) // gives error because it is async method and we need to provide a callback function to handle the error and result

// to handle the error and result we can use callback function as a second argument in writeFile method
fs.writeFile("async.txt", "Hello from async fs!", (err) => {
  if (err) {
    console.error(err)
  } else {
    console.log("File written successfully!")
  }
})

// fs.readFile("async.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.error(err)  
//   } else {
//     console.log("READ: ",data)
//   }
// })

//What's the problem with async code with callback? Callback hell, pyramid of doom, hard to read and maintain code. To solve this problem we can use promises and async/await.

// to use promises we can use the fs.promises API which returns a promise instead of using callback function

fs.readFile("a.txt", "utf-8", (err, data) => {
    fs.writeFile("b.txt", data, (err) => {
        fs.appendFile("b.txt", "\nDone", (err) => {
            fs.unlink("a.txt", (err) => {
                if(err) console.error(err)
                else console.log("File a.txt deleted successfully!")
        })
    })
})
})
// to avoid callback hell we can use promises and async/await

// using promises