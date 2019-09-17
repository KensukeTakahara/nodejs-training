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

const data = {
  Taro: "09-999-999",
  Hanako: "080-888-888",
  Sachiko: "070-777-777",
  Ichiro: "060-666-666"
};

const responseIndex = (request, response) => {
  let msg = "これはテンプレートを使ったサンプルページです。";
  const content = ejs.render(index_page, {
    title: "Index",
    content: msg,
    data,
    filename: "data_item"
  });
  writeToResponse(response, content, "text/html");
};

const data2 = {
  Taro: ["taro@yamada", "09-999-999", "Tokyo"],
  Hanako: ["hanako@flower", "080-888-888", "Yokohama"],
  Sachiko: ["sachi@happy", "070-777-777", "Nagoya"],
  Ichiro: ["ichi@baseball", "060-666-666", "USA"]
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
        content: msg,
        data: data2,
        filename: "data_item"
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
