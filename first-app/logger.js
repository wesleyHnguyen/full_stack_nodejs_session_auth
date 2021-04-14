// var x=; (function (exports, require, module, _filename, _dirname) { Module wrapper function 

const EventEmitter = require('events')
// const emitter = new EventEmitter()

var url = 'http://mylogger.io/log';

class LoggingEventEmitter extends EventEmitter {

    log(message) {
        console.log(message);
    
        this.emit('messageLogged', { id: 1, url: 'http://'})
    
    }
    
}


// console.log(__filename)
// console.log(__dirname)

//  both variable and function are scoped to the module and
// they are not visible to the outside

// how app module accesses the log function
//  ---> make it visible to the outside

// module.exports.log = log;
// module.exports.endPoint = url; --> the details -> hide it from the outside
// this is used for exporting complext object

// to export a single function
module.exports = LoggingEventEmitter;

// exports.log = log; // is ok
// but we can not do
// exports = log; // because it is a reference to module.exports

// })