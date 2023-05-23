const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross origin requests
app.use(cors());

const URL =
  "mongodb+srv://graphql:xfzOsCi81pufIjv3@cluster0.zynulhl.mongodb.net/test";

mongoose.connect(URL).then(() => {
  console.log("connected to the database...");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    // pass in a schema property
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
