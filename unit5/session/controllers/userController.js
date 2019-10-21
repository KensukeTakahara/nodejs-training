const User = require("../models/user"),
  { check, validationResult, sanitizeBody } = require("express-validator"),
  getUserParams = body => {
    return {
      name: {
        first: body.firstName,
        last: body.lastName
      },
      email: body.email,
      zipCode: body.zipCode,
      password: body.password
    };
  };

module.exports = {
  index: (req, res, next) => {
    User.find()
      .then(users => {
        res.locals.users = users;
        next();
      })
      .catch(error => {
        console.log(`Error fetching users:${error.message}`);
        next(error);
      });
  },
  indexView: (req, res) => {
    res.render("users/index");
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let messages = errors.array().map(e => e.msg);
      req.flash("error", messages.join(" and "));
      res.locals.redirect = "/users/new";
      next();
      return;
    }
    let userParams = getUserParams(req.body);
    User.create(userParams)
      .then(user => {
        req.flash(
          "success",
          `${user.fullName}'s account created successfully.`
        );
        res.locals.redirect = "/users";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user:${error.message}`);
        res.locals.redirect = "/users/new";
        req.flash(
          "error",
          `Failed to create user account because:${error.message}`
        );
        next();
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  show: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID:${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("users/show");
  },
  edit: (req, res, next) => {
    const userId = req.params.id;
    User.findById(userId)
      .then(user => {
        res.render("users/edit", {
          user
        });
      })
      .catch(error => {
        console.log(`Error fetching user by ID:${error.message}`);
        next();
      });
  },
  update: (req, res, next) => {
    const userId = req.params.id,
      userParams = getUserParams(req.body);
    User.findByIdAndUpdate(userId, {
      $set: userParams
    })
      .then(user => {
        res.locals.redirect = `/users/${userId}`;
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error updating user by ID:${error.message}`);
        next();
      });
  },
  delete: (req, res, next) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
      .then(() => {
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {
        console.log(`Error deleting user by ID:${error.message}`);
        next();
      });
  },
  login: (req, res) => {
    res.render("users/login");
  },
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          user.passwordComparison(req.body.password).then(passwordMatch => {
            if (passwordMatch) {
              res.locals.redirect = `/users/${user._id}`;
              req.flash(
                "success",
                `${user.fullName}'s logged in successfully.`
              );
              res.locals.user = user;
            } else {
              req.flash(
                "error",
                "Failed to log in user account:Incorrect Password."
              );
              res.locals.redirect = "/users/login";
            }
            next();
          });
        } else {
          req.flash(
            "error",
            "Failed to log in user account:User account not found."
          );
          res.locals.redirect = "/users/login";
          next();
        }
      })
      .catch(error => {
        console.log(`Error logging in user: ${error.message}`);
        next(error);
      });
  },
  validate: [
    sanitizeBody("email")
      .normalizeEmail({
        all_lowercase: true
      })
      .trim(),
    check("email", "Email is invalid").isEmail(),
    check("zipCode", "Zip code is invalid")
      .not()
      .isEmpty()
      .isInt()
      .isLength({
        min: 5,
        max: 5
      }),
    check("password", "Password cannot by empty")
      .not()
      .isEmpty()
  ]
};
