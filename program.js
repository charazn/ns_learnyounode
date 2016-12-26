var port = process.argv[2];
const http = require('http');
const url = require('url');
const strftime = require('strftime');

const server = http.createServer(function(request, response) {
  request.on('error', function(e) {
    console.log('problem with request: ${e.message}');
  });
  
  parsedurl = url.parse(request.url, true);
  console.log(parsedurl);
  pathname = parsedurl.pathname;
  fulldate = new Date(parsedurl.query.iso);
  parsedtime = strftime('%T', fulldate);
  parsedtimearr = parsedtime.split(':');
  jsontime = JSON.stringify({'hour': parseInt(parsedtimearr[0]), 'minute': parseInt(parsedtimearr[1]), 'second': parseInt(parsedtimearr[2])});
  unixtime = JSON.stringify({'unixtime': fulldate.getTime()});

  response.writeHead(200, { 'content-type': 'text/plain' });

  if (pathname === '/api/parsetime') {
    response.write(jsontime);
  } else if (pathname === '/api/unixtime') {
    response.write(unixtime);
  }

  response.end();
})

server.listen(port);