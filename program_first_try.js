// Challenge 1 HELLO WORLD
// console.log('HELLO WORLD')

// Challenge 2 BABY STEPS
// console.log(process.argv);
// [ '/Users/Char/.nvm/versions/node/v6.6.0/bin/node',
//   '/Users/Char/nodejs/nodeschool/learnyounode/program.js',
//   '9',
//   '85',
//   '75',
//   '50',
//   '83' ]
// console.log(process.argv.length);
// var sum = 0;
// for (i=2;i<process.argv.length;i++) {
//     sum += parseInt(process.argv[i]);
// }
// console.log(sum);

// Challenge 3 MY FIRST I/O
// var fs = require('fs');
// var buf = fs.readFileSync(process.argv[2]);
// var str = buf.toString();
// console.log(str.split('\n').length-1);
// Given solution
// var fs = require('fs')
// var contents = fs.readFileSync(process.argv[2])
// var lines = contents.toString().split('\n').length - 1
// console.log(lines)
// Note you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

// Challenge 4 MY FIRST ASYNC I/O
// var fs = require('fs');
// fs.readFile(process.argv[2], logLines);
//
// function logLines(err, contents) {
//   var lines = contents.toString().split('\n').length - 1;
//   console.log(lines);
// }
//
// Given solution
// var fs = require('fs')
// var file = process.argv[2]
//
// fs.readFile(file, function (err, contents) {
//   if (err) {
//     return console.log(err)
//   }
//   // fs.readFile(file, 'utf8', callback) can also be used
//   var lines = contents.toString().split('\n').length - 1
//   console.log(lines)
// })

// Challenge 5 FILTERED LS
// var fs = require('fs');
// var path = require('path');
// var dir = process.argv[2];
// var ext = process.argv[3]
//
// fs.readdir(dir, function(err, files) {
//   for (i = 0; i < files.length; i++) {
//     if (path.extname(files[i]).slice(1) === ext) {
//       console.log(files[i]);
//     }
//   }
// });
//
// Given solution
// var fs = require('fs')
// var path = require('path')
//
// var folder = process.argv[2]
// var ext = '.' + process.argv[3]
//
// fs.readdir(folder, function (err, files) {
//   if (err) return console.error(err)
//   files.forEach(function(file) {
//       if (path.extname(file) === ext) {
//           console.log(file)
//       }
//   })
// })

// Challenge 6 MAKE IT MODULAR
// const fs = require('fs');
// const path = require('path');
// console.log(require.resolve('dirreadfilter'));
// or const readFilter = require('./dirreadfilter'); if not using node_modules, and has a file dirreadfilter.js in the same level as program.js
// const readFilter = require('dirreadfilter');
// const dir = process.argv[2];
// const ext = process.argv[3];
//
// readFilter(dir, ext, function(err, data) { // data is the returned value listLines which is an array of file names in string
//   if (err) console.log(err);
//   // or console.log, console.warn, console.info
//   // See http://stackoverflow.com/questions/164397/javascript-how-do-i-print-a-message-to-the-error-console
//
//   data.forEach(function(line) { // data is listLines, an array of the lines returned in the dirreadfilter module
//     console.log(line);
//   });
// });
// node_modules/dirreadfilter/index.js
// const fs = require('fs');
// const path = require('path');
//
// module.exports = function (dirname, fileExt, callback) {
//   fs.readdir(dirname, function(err, files) {
//     // if (err) return console.error(err);
//     if (err) return callback(err);
//
//     const listLines = files.filter(function(file) { // JavaScript Array filter()
//       return path.extname(file) === '.' + fileExt;
//     }); // returns an array of file names in string
//
//     callback(null, listLines); // listLines will be passed as the parameter data in the callback function 
//   });
// };
//
// Given solution
// var filterFn = require('./solution_filter.js')
// var dir = process.argv[2]
// var filterStr = process.argv[3]
//
// filterFn(dir, filterStr, function (err, list) {
//   if (err)
//     return console.error('There was an error:', err)
//
//   list.forEach(function (file) {
//     console.log(file)
//   })
// })
// node_modules/dirreadfilter/index.js
// var fs = require('fs')
// var path = require('path')
//
// module.exports = function (dir, filterStr, callback) {
//
//   fs.readdir(dir, function (err, list) {
//     if (err)
//       return callback(err)
//
//     list = list.filter(function (file) {
//       return path.extname(file) === '.' + filterStr
//     })
//
//     callback(null, list)
//   })
// }


// Challenge 7 HTTP CLIENT
// const http = require('http');
// var url = process.argv[2];
// // console.log(url);
//
// http.get(url, function(response) {
//   response.setEncoding('utf8');
//   // console.log(response);
//   response.on('data', function (data) {
//     // console.log(typeof(data));
//     console.log(data);
//   });
// });
// See https://nodejs.org/api/http.html#http_http_get_options_callback on how to use http.get()
//
// Given solution
// var http = require('http');
// http.get(process.argv[2], function (response) {
//   response.setEncoding('utf8');
//   response.on('data', console.log);
//   response.on('error', console.error);
// }).on('error', console.error);

// Challenge 8 HTTP COLLECT
// const http = require('http');
// const concat = require('concat-stream');
// var url = process.argv[2];
//
// http.get(url, function(response) {
//   response.setEncoding('utf8');
//   response.on('error', console.error);
//   // OR
//   // response.on('error', function(err) {
//   //   console.log(err);
//   //   process.exit(1);
//   // })
//   
//   response.pipe(concat(function(data) { // data is a buffer
//     // concat-stream https://www.npmjs.com/package/concat-stream
//     // Writable stream that concatenates all the data from a stream and calls a callback with the result. Use this when you want to collect all the data from a stream into a single buffer.
//     // Piping is a mechanism in which you can read data from the source and write to destination without managing the flow yourself. 
//     // var fs = require('fs');
//     // var readableStream = fs.createReadStream('file1.txt');
//     // var writableStream = fs.createWriteStream('file2.txt');
//
//     // readableStream.pipe(writableStream);
//     // The above snippet makes use of the pipe() function to write the content of file1 to file2.
//     data.toString();
//     console.log(data.length);
//     console.log(data);
//   }));
//   // QUESTION: How to set response.on('end')
// });
//
// Given solution
// var http = require('http')
// var bl = require('bl')
//
// http.get(process.argv[2], function (response) {
//   response.pipe(bl(function (err, data) {
//     if (err)
//       return console.error(err)
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//   }))
// })
//
// Challenge 9 JUGGLING ASYNC // WITHOUT USING ASYNC
// const http = require('http');
// const concat = require('concat-stream');
// var urls = process.argv.slice(2);
// var lines = [];
// var count = 0;
//
// function httpGet(idx) {
//   http.get(urls[idx], function(response) {
//     response.setEncoding('utf8');
//     response.on('error', console.error);
//
//     response.pipe(concat(function(data) {
//       lines[idx] = data; // no need to data.toString() as response.setEncoding('utf8') has already turned data buffer into string
//       count++
//       // console.log(idx);
//       // console.log(urls.length-1);
//
//       if (count === 3) { // or (count === urls.length) instead of (idx === urls.length-1)
//         // Asked question on Github issue https://github.com/nodeschool/discussions/issues/440 on 2016.09.27
//         for (i = 0; i < lines.length; i++) {
//           console.log(lines[i]);
//         }
//       }
//     }));
//   });
// }
//
// for (i = 0; i < urls.length; i++) {
//   httpGet(i);
// }
//
// Challenge 9 // REDO USING async
// const http = require('http');
// const concat = require('concat-stream');
// const async = require('async');
// var urls = process.argv.slice(2);
//
// // Reference http://caolan.github.io/async/docs.html#.queue
// // Reference https://github.com/nodeschool/discussions/issues/203, Acen1991 commented on Oct 11, 2015
// // queue(worker, concurrency(opt))
// var q = async.queue(function(task, callback) { // task is each of the urls when the q is added some tasks, ie. q.push(urls, console.log)
//                                                // the callback is console.log
//   http.get(task, function(response) {
//     response.setEncoding('utf8');
//     response.on('error', console.error);
//     response.pipe(concat(function(data) {
//       callback(data.toString());
//     }));
//   });
// });
// // This works
// q.push(urls, console.log); // Add some items to the queue (batch-wise) (in an array)
// // This does not work, WHY?!
// // q.push(urls, function(err) {
// //   console.log
// // });
// // Reference
// // q.push([{name: 'baz'}, {name: 'bay'}, {name: 'bax'}], function(err) {
// //     console.log('finished processing item');
// // });
//
// Given solution
// var http = require('http')
// var bl = require('bl')
// var results = []
// var count = 0
//
// function printResults () {
//   for (var i = 0; i < 3; i++)
//     console.log(results[i])
// }
//
// function httpGet (index) {
//   http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//       if (err)
//         return console.error(err)
//
//       results[index] = data.toString()
//       count++
//
//       if (count == 3)
//         printResults()
//     }))
//   })
// }
//
// for (var i = 0; i < 3; i++)
//   httpGet(i)
//
// Challenge 10 TIME SERVER // WITHOUT USING sfrtime
// var port = process.argv[2];
// const net = require('net');
// var date = new Date();
// var year = date.getFullYear();
// var month = date.getMonth()+1;
// var day = date.getDate();
// var hours = date.getHours();
// var minutes = date.getMinutes();
// if (month < 10) {
//   month = '0'+month.toString();
// }
// if (day < 10) {
//   day = '0'+day.toString();
// }
// if (hours < 10) {
//   hours = '0'+hours.toString();
// }
// if (minutes < 10) {
//   minutes = '0'+minutes.toString();
// }
// var dateString = year+'-'+month+'-'+day+' '+hours+':'+minutes;
//
// const server = net.createServer(function(socket) {
//   socket.end(dateString+'\n', 'utf8'); // Syntax socket.end([data][, encoding]), equivalent to socket.end(data, encoding)
// })
// server.listen(port);
//
// Challenge 10 // REDO USING sfrtime
// var port = process.argv[2];
// const net = require('net');
// const strftime = require('strftime');
// var formattedDate = strftime('%F %R', new Date());
//
// const server = net.createServer(function(socket) {
//   socket.write(formattedDate+'\n', 'utf8');
//   socket.end();
// })
// server.listen(port);
//
// Given solution
// var net = require('net')
//
// function zeroFill(i) {
//   return (i < 10 ? '0' : '') + i
// }
//
// function now () {
//   var d = new Date()
//   return d.getFullYear() + '-'
//     + zeroFill(d.getMonth() + 1) + '-'
//     + zeroFill(d.getDate()) + ' '
//     + zeroFill(d.getHours()) + ':'
//     + zeroFill(d.getMinutes())
// }
//
// var server = net.createServer(function (socket) {
//   socket.end(now() + '\n')
// })
//
// server.listen(Number(process.argv[2]))
//
// Challenge 11 HTTP FILE SERVER
// var port = process.argv[2];
// var fileLocation = process.argv[3];
// const http = require('http');
// const fs = require('fs');
//
// const server = http.createServer(function(request, response) {
//   fs.createReadStream(fileLocation).pipe(response);
// })
//
// server.listen(port);
//
// Given solution
// var http = require('http')
// var fs = require('fs')
//
// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })
//
//   fs.createReadStream(process.argv[3]).pipe(res)
// })
//
// server.listen(Number(process.argv[2]))
//
// Challenge 12 HTTP UPPERCASERER
// var port = process.argv[2];
// const map = require('through2-map');
// const http = require('http');
//
// const server = http.createServer(function(request, response) {
//   request.on('error', function(e) {
//     console.log('problem with request: ${e.message}');
//   });
//
//   // Reference https://www.npmjs.com/package/through2-map
//   request.pipe(map(function(chunk) { // chunk is a stream
//     return chunk.toString().toUpperCase();
//   })).pipe(response);
// })
//
// server.listen(port);
//
// Given solution
// var http = require('http')
// var map = require('through2-map')
//
// var server = http.createServer(function (req, res) {
//   if (req.method != 'POST')
//     return res.end('send me a POST\n')
//
//   req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//   })).pipe(res)
// })
//
// server.listen(Number(process.argv[2]))
//
// Challenge 13 HTTP JSON API SERVER
var port = process.argv[2];
const http = require('http');
const url = require('url');
const strftime = require('strftime');

const server = http.createServer(function(request, response) {
  request.on('error', function(e) {
    console.log(`problem with request: ${e.message}`);
  });

  parsedurl = url.parse(request.url, true); // ie. returns a javascript object
  // url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
  // urlString <String> The URL string to parse.
  // parseQueryString <Boolean> If true, the query property will always be set to an object returned by the querystring module's parse() method.
  // The querystring module provides utilities for parsing and formatting URL query strings. 
  pathname = parsedurl.pathname;
  fulldate = new Date(parsedurl.query.iso);
  parsedtime = strftime('%T', fulldate);
  parsedtimearr = parsedtime.split(':');
  jsontime = JSON.stringify({'hour': parseInt(parsedtimearr[0]), 'minute': parseInt(parsedtimearr[1]), 'second': parseInt(parsedtimearr[2])});
  unixtime = JSON.stringify({'unixtime': fulldate.getTime()});

  response.writeHead(200, { 'content-type': 'text/plain' });
  // Need to implement error handling, ie. only if there is a returned time, then response.writeHead() and response.end()

  // Reference https://github.com/workshopper/learnyounode/issues/184
  if (pathname === '/api/parsetime') {
    response.write(jsontime);
  } else if (pathname === '/api/unixtime') {
    response.write(unixtime);
  }

  response.end();
})

server.listen(port);
//
// Given solution
// var http = require('http')
// var url = require('url')
//
// function parsetime (time) {
//   return {
//     hour: time.getHours(),
//     minute: time.getMinutes(),
//     second: time.getSeconds()
//   }
// }
//
// function unixtime (time) {
//   return { unixtime : time.getTime() }
// }
//
// var server = http.createServer(function (req, res) {
//   var parsedUrl = url.parse(req.url, true)
//   var time = new Date(parsedUrl.query.iso)
//   var result
//
//   if (/^\/api\/parsetime/.test(req.url))
//     result = parsetime(time)
//   else if (/^\/api\/unixtime/.test(req.url))
//     result = unixtime(time)
//
//   if (result) {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(result))
//   } else {
//     res.writeHead(404)
//     res.end()
//   }
// })
// server.listen(Number(process.argv[2]))
