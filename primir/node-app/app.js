const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

const getFromClient = (req, res) => {
  const url_place = url.parse(req.url);
  switch (url_place.pathname) {
    case "/": {
      const data = ejs.render(index_page, {
        title: "Index",
        content: "これはテンプレートを使ったサンプルページです。"
      });
      writeToResponse(res, data, "text/html");
      break;
    }
    case "/style.css": {
      writeToResponse(res, style_css, "text/css");
      break;
    }
    case "/other": {
      const data = ejs.render(other_page, {
        title: "Other",
        content: "これは新しく用意したページです。"
      });
      writeToResponse(res, data, "text/html");
      break;
    }
    default: {
      writeToResponse(res, "no page...", "text/plain");
      break;
    }
  }
};

const writeToResponse = (res, data, type) => {
  res.writeHead(200, { "Content-Type": type });
  res.write(data);
  res.end();
};

let server = http.createServer(getFromClient);
server.listen(3000);
console.log("Server start!");
