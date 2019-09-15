const http = require("http");
const fs = require("fs");
const ejs = require("ejs");

const index_page = fs.readFileSync("./index.ejs", "utf8");

const getFromClient = (req, res) => {
  const data = ejs.render(index_page, {
    title: "Index",
    content: "これはテンプレートを使ったサンプルページです。"
  });
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
