const mongoose = require("mongoose"),
  { Schema } = mongoose,
  Subscriber = require("./subscriber"),
  bcrypt = require("bcrypt"),
  passportLocalMongoose = require("passport-local-mongoose"),
  userSchema = new Schema(
    {
      name: {
        first: {
          type: String,
          trim: true
        },
        last: {
          type: String,
          trim: true
        }
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      zipCode: {
        type: Number,
        min: [10000, "Zip code is too short"],
        max: 99999
      },
      courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      subscribedAccount: {
        type: Schema.Types.ObjectId,
        ref: "Subscriber"
      }
    },
    {
      timestamps: true
    }
  );

userSchema.virtual("fullName").get(function() {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function(next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

// userSchema.pre("save", function(next) {
//   let user = this;
//   bcrypt
//     .hash(user.password, 10)
//     .then(hash => {
//       user.password = hash;
//       next();
//     })
//     .catch(error => {
//       console.log(`Error in hashing password: ${error.message}`);
//       next(error);
//     });
// });

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
});

module.exports = mongoose.model("User", userSchema);
