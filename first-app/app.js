// Loading a module from another module
// require -- load a module -- receive a relative path
// var logger = require('./logger') -- var should be changed to constants
// To avoid accidentally reassigned in the code
const LoggingEvent = require('./logger');
//  path module
const path = require('path')
// os module
const os = require('os')
// filesystem module
const fs = require('fs')
// events module
// const EventEmitter = require('events')


const emitter = new LoggingEvent();

// EventEmitter is a class - not just a single value
// const emitter = new EventEmitter();


// Register a listener
// must be placed before event emitter
// emitter.on('messageLogged', function(){
//     console.log('Listener called')
// })

// receive event arguments
emitter.on('messageLogged', function(eArg){
    console.log('Listener called' , eArg)
})


emitter.log('logger message')


// Making a noise - produce signalling
// Raise an event
// emitter.emit('messageLogged') // We can add additional arguments -- 
// Event arguments
// emitter.emit('messageLogged', 1, 'url') -- > shoul be
// emitter.emit('messageLogged', { id: 1, url: 'http://'})



// emitter.on('logging', (eArg) => {
//     console.log(eArg)
// })

// emitter.emit('logging', {data: 'message'})

// logger('event message'); // This will emit an event with another event emitter (defined in logger module)
// we are working with different instance of EventEmitter class

// in real-world we often don't work with the event emitter object directly


// always use async methods
// const files =  fs.readdirSync('./')
// console.log(files)


// all async functions get a function as the last argument
// the function is called - a callback function
// it will be executed after the operation(IO, network) completes
const files = fs.readdir('$', function(err, files) {
    if (err) console.log('Error', err);
    else console.log('Result: ', files);
})

var totalMemory = os.totalmem
var freeMem = os.freemem


console.log('Total Memory: ' + totalMemory)

// using template string
console.log(`Free Memory: ${freeMem}`)

// return: an object with various properties
// {
//     root: '/',
//     dir: '/home/abram/node-projects/first-app',
//     base: 'app.js',
//     ext: '.js',
//     name: 'app'
//   }
var pathObj = path.parse(__filename)

console.log(pathObj)

// logger = 1;

// return an object { log: [Function: log] }
// with one method
// console.log(logger)
// logger.log('hello')

// logger now is just a function
// logger('message') 



function sayhello(name) {
    console.log('Hello ' + name)
}

// sayhello('Wesley')
// console.log(window)

// console.log -- global - can be accessed everywhere -- window.console.log --> in node --> global object
// seTimout -- window.setTimeout -- global.setTimeout
// clearTimeout() -- they are global object in node.

// not like javascript in browser -- var - keyword can not defined a global object.
var message = '';
console.log(global.message);

// test the module object -- it appear as a global object but it is not.
// in node every file is a module - all function, variable defined inside is scoped to the module
// console.log(module)
