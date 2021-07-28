const express = require("express");
const app = express();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const dbo = require("./db/conn");

var schema = buildSchema(`
  input FlatInput {
    address: String
    landlord_name: String
    tenant_name: String
  }
  
  type Flat {
    id: ID!
    landlord_name: String
    tenant_name: String
    address: String
  }

  type Query {
    getFlats(landlord_name: String): [Flat]
  }

  type Mutation {
    setFlat(flat: FlatInput): Flat
  }
`);

var response;

var root = {
  getFlats: ({}) => {
    let db_connect = dbo.getDb("myFirstDatabase");

    db_connect
      .collection("flats")
      .find({})
      .toArray(function (err, result) {
        if (err) throw err;
        response = result;
      });

    console.log(response);
    return response;
  },

  setFlat: ({ flat }) => {
    let db_connect = dbo.getDb("myFirstDatabase");

    db_connect.collection("flats").insertOne(flat, function (err, res) {
      if (err) throw err;
    });

    return flat;
  },
};
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.use(express.json());

app.listen(port, () => {
  dbo.connectToServer(function (err) {
    if (err) console.log(err);
  });

  console.log(`Server is running on port: ${port}`);
});
