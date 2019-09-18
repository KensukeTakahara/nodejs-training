const http = require("http");
const fs = require("fs");
const ejs = require("ejs");
const url = require("url");
const qs = require("querystring");

const indexPage = fs.readFileSync("./index.ejs", "utf8");
const loginPage = fs.readFileSync("./login.ejs", "utf8");
const styleCss = fs.readFileSync("./style.css", "utf8");

const MAX_NUM = 10;
const filename = "mydata.txt";
let messageData;

const getFromClient = (request, response) => {
  const urlParams = url.parse(request.url, true);
  switch (urlParams.pathname) {
    case "/":
      responseIndex(request, response);
      break;
    case "/login":
      responseLogin(request, response);
      break;
    case "/style.css":
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(styleCss);
      response.end();
      break;
    default:
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end();
      break;
  }
};

const responseLogin = (request, response) => {
  const content = ejs.render(loginPage, {});
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
};

const responseIndex = (request, response) => {
  if (request.method === "POST") {
    let body = "";
    request.on("data", function(data) {
      body += data;
    });
    request.on("end", function() {
      data = qs.parse(body);
      addToData(data.id, data.msg, filename, request);
      writeIndex(request, response);
    });
  } else {
    writeIndex(request, response);
  }
};

const writeIndex = (request, response) => {
  let msg = "※何かメッセージを書いてください。";
  const content = ejs.render(indexPage, {
    title: "Index",
    content: msg,
    data: messageData,
    filename: "data_item"
  });
  response.writeHead(200, { "Content-Type": "text/html" });
  response.write(content);
  response.end();
};

const readFromFile = fname => {
  fs.readFile(fname, "utf8", (err, data) => {
    messageData = data.split("\n");
  });
};

const addToData = (id, msg, fname, request) => {
  const obj = { id, msg };
  const objStr = JSON.stringify(obj);
  console.log(objStr);
  messageData.unshift(objStr);
  if (messageData.length > MAX_NUM) {
    messageData.pop();
  }
  saveToFile(fname);
};

const saveToFile = fname => {
  const dataStr = messageData.join("\n");
  fs.writeFile(fname, dataStr, err => {
    if (err) {
      throw err;
    }
  });
};

readFromFile(filename);
const server = http.createServer(getFromClient);
server.listen(3000);
console.log("server start.");
