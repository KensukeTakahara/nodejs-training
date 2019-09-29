exports.sendReqParam = (req, res) => {
  let veg = req.params.vegetable;
  res.send(`This is the page for ${veg}.`);
};

exports.logRequestPaths = (req, res, next) => {
  console.log(`request made for ${req.url}.`);
  next();
};

exports.getParams = (req, res) => {
  console.log(req.params);
  console.log(req.body);
  console.log(req.url);
  console.log(req.query);
  res.send("Hello, Universe");
};

exports.postParams = (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send("POST Successful!");
};

exports.userSignUpProcessor = (req, res) => {
  res.send(`${req.body}`);
};
