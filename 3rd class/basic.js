setImmediate(() => console.log('setImmediate'));
fs.readFile('/etc/passwd', (err, data) => {
  console.log('reading file');
});
console.log('start');  //1
process.nextTick(() => console.log('nextTick'));
setTimeout(() => console.log('setTimeout 1'), 0);
setTimeout(() => console.log('setTimeout 2'), 3);
let counter = 0;
const timeout = setInterval(() => {
  console.log('setInterval');
  if (counter >= 3) {
    console.log('exiting setInterval');
    clearInterval(timeout);
  }
  counter++;
}, 0);
new Promise((resolve, reject) => {
  console.log('start promise 1');//2
  resolve('Promise 1');
}).then((data) => {
  console.log(data);
});
console.log('end');  

/*
start
start promise 1
end
nextTick
Promise 1
setTimeout 1
setInterval
setImmediate
setTimeout 2
setInterval
reading file
setInterval
setInterval
exiting setInterval

*/