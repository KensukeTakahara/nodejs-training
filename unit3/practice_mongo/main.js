const MongoDB = require("mongodb").MongoClient,
  dbURL = "mongodb://localhost:27017",
  dbName = "recipe_db",
  iceDBName = "ice_cream_flavors";

MongoDB.connect(dbURL, (error, client) => {
  if (error) throw error;
  let db = client.db(dbName);
  db.collection("ice_cream_flavors")
    .find()
    .toArray((error, data) => {
      if (error) throw error;
      console.log(data);
    });
  // db.collection("contacts").insert(
  //   {
  //     name: "Freddie Mercury",
  //     email: "fred@queen.com"
  //   },
  //   (error, data) => {
  //     if (error) throw error;
  //     console.log(data);
  //   }
  // );
  // db.collection("ice_cream_flavors").insert(
  //   {
  //     color: "green",
  //     taste: "melon"
  //   },
  //   (error, data) => {
  //     if (error) throw error;
  //     console.log(data);
  //   }
  // );
});
