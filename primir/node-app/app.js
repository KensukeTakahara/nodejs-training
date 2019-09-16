const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

const index_page = fs.readFileSync("./index.ejs", "utf8");
const other_page = fs.readFileSync("./other.ejs", "utf8");
const style_css = fs.readFileSync("./style.css", "utf8");

const getFromClient = (req, res) => {
  const url_place = url.parse(req.url, true);
  switch (url_place.pathname) {
    case "/": {
      responseIndex(req, res);
      break;
    }
    case "/style.css": {
      writeToResponse(res, style_css, "text/css");
      break;
    }
    case "/other": {
      responseOther(req, res);
      break;
    }
    default: {
      writeToResponse(res, "no page...", "text/plain");
      break;
    }
  }
};

const responseIndex = (request, response) => {
  let content = "これはテンプレートを使ったサンプルページです。";
  const data = ejs.render(index_page, {
    title: "Index",
    content
  });
  writeToResponse(response, data, "text/html");
};

const responseOther = (request, response) => {
  let msg = "これはOtherページです。";
  if (request.method == "POST") {
    let body = "";
    request.on("data", data => {
      body += data;
    });
    request.on("end", () => {
      let post_data = qs.parse(body);
      msg += "あなたは、「" + post_data.msg + "」と書きました。";
      const data = ejs.render(other_page, {
        title: "Other",
        content: msg
      });
      writeToResponse(response, data, "text/html");
    });
  } else {
    msg += "ページがありません。";
    const data = ejs.render(other_page, {
      title: "Other",
      content: msg
    });
    writeToResponse(response, data, "text/html");
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
