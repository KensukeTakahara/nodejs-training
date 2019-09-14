const http = require("http");
const fs = require("fs");

const getFromClient = (req, res) => {
  const data = fs.readFileSync("./index.html", "UTF-8");
  writeToResponse(res, data);
};

const writeToResponse = (res, data) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(data);
  res.end();
};

let server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server start!");
