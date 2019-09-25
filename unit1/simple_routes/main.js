"use strict";

const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<a href='mailto:test@example'>here</a>",
  "/error": "<p>Sorry, the page you are looking for is not here.</p>"
};

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");
const app = http.createServer((request, response) => {
  response.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });
  if (routeResponseMap[request.url]) {
    response.write(routeResponseMap[request.url]);
  } else {
    response.write("<h1>Hello, Universe!</h1>");
  }
  response.end();
});
app.listen(port);
console.log(`The server has started and is listening on port number:${port}`);
