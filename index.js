const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');
var cors = require('cors');
app.use(cors());


const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const { JWT_SECRET, MONGODB_URI } = require("./config/keys");

const port = 5000;
// const MONGODB_URI =
//   "mongodb://avnesh:Ak2566@ac-hpvuaqp-shard-00-00.y5vq4ih.mongodb.net:27017,ac-hpvuaqp-shard-00-01.y5vq4ih.mongodb.net:27017,ac-hpvuaqp-shard-00-02.y5vq4ih.mongodb.net:27017/?ssl=true&replicaSet=atlas-oiw14b-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectparams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set('strictQuery', 'true');

const connectTomongo = () => {
    mongoose.connect(MONGODB_URI, connectparams).then(() => {
        console.log("connected to mongo Succesfully");
    }).catch((error) => {
        console.log(error);
    })
}

connectTomongo();

// app.get('/', (req, res) => {
//     res.send("Hello world");
// });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/invest', require('./routes/invest'));





if (process.env.NODE_ENV == "production") {
  const path = require("path");

  app.get("/", (req, res) => {
    app.use(express.static(path.resolve(__dirname, "client", "build")));
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.listen(port, () => {
    console.log(`App listening on port https://localhost:${port}`);
})