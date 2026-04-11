import fs from "node:fs/promises"

//global level await is only allowed in ES modules. So we need to add "type": "module" in package.json file to use global level await. If we don't want to use global level await then we can use async IIFE (Immediately Invoked Function Expression) to use await inside it.

// (async ()=>{
//     const data=await fs.readFile("promises.txt", "utf-8")
//     console.log(data)
// })()
const data=await fs.readFile("promises.txt", "utf-8")// error
console.log(data)

