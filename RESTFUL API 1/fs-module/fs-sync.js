import fs from "node:fs"
//to create, read, update, delete, directories etc we use fs module in nodejs. It has two types of API: sync and async. Sync API will block the event loop until the operation is completed while async API will not block the event loop and will return a promise.
//sync: one task at a time, blocking, easier to read and write, not recommended for production
//async: multiple task at a time, non-blocking, harder to read and write, recommended for production

// 1. WRITE
 //serach for the file if exist then it will overwrite otherwise it will create new file
 fs.writeFileSync("test.txt", "Hello from sync fs!")

// 2. READ
// it will read the file and return buffer data so we need to specify encoding to get string data
//const data = fs.readFileSync("test.txt") // by default it will return buffer data so we need to specify encoding to get string data

const data = fs.readFileSync("test.txt", "utf-8") //Hello from sync fs!
console.log(data)

fs.writeFileSync("test.txt", "Hello from sync fs!")// it overwrite the file

// 3. UPDATE
// to update a file we can use appendFileSync method which will add new data to the end of the file without overwriting it
fs.appendFileSync("test.txt", "\nThis is new line") // it will add new line to the end of the file  


fs.mkdirSync("myFolder") // it will create a new directory named test
fs.mkdirSync("myFolder/innerFolder", {recursive:true}); // it will create a new directory named innerFolder inside myFolder. if myFolder doesn't exist then it will create myFolder first and then innerFolder
// if recursive is false then it will throw an error if myFolder doesn't exist



/* --------------------------------------------------------------------------*/
//fs.unlinkSync("test.txt") // it will delete the file named test.txt

fs.renameSync("test.txt", "test1.txt") // it will rename the file test.txt to newTest.txt

fs.cpSync("test1.txt", "test2.txt") // it will copy the file test1.txt to test2.txt
//fs.rmdirSync("myFolder") // it will remove the directory named myFolder // it will throw an error if the directory is not empty
fs.rmdirSync("myFolder", {recursive:true}) // it will remove the directory named myFolder and all its contents


//Now u can try other methods like readdirSync, statSync, lstatSync, etc. You can also try to create a directory inside another directory and then delete the parent directory to see the effect of recursive option in rmdirSync method.