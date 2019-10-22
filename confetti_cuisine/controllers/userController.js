const User = require("../models/user"),
  { check, validationResult, sanitizeBody } = require("express-validator"),
  passport = require("passport"),
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
    const errors = validationResult(req.body);
    if (errors.not().isEmpty()) {
      let messages = errors.mapped(e => e.msg);
      req.flash("error", messages.join(" and "));
      res.locals.redirect = "/users/new";
      next();
      return;
    }

    let newUser = new User(getUserParams(req.body));
    User.register(newUser, req.body.password, (e, user) => {
      if (user) {
        req.flash(
          "success",
          `${user.fullName}'s account created successfully.`
        );
        res.locals.redirect = "/users";
        next();
      } else {
        req.flash(
          "error",
          `Failed to create user account because:${e.message}`
        );
        res.locals.redirect = "/users/new";
        next();
      }
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
  validate: [
    sanitizeBody("email")
      .normalizeEmail({ all_lowercase: true })
      .trim(),
    check("email", "Email is invalid")
      .not()
      .isEmail(),
    check("zipCode", "Zip code is invalid")
      .not()
      .isEmpty()
      .isInt()
      .isLength({ min: 5, max: 5 }),
    check("password", "Password cannot be empty")
      .not()
      .isEmpty()
  ],
  authenticate: passport.authenticate("local", {
    failureRedirect: "/users/login",
    failureFlash: "Failed to login",
    successRedirect: "/users",
    successFlash: "Logged in!"
  }),
  logout: (req, res, next) => {
    req.logout();
    req.flash("success", "You have been logged out!");
    res.locals.redirect = "/";
    next();
  }
};
