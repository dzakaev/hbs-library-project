const express = require("express");
const mongoose = require("mongoose");
const hbs = require("express-handlebars");
const router = require("./routes/index")
const url = "mongodb+srv://usman:U123456u@cluster0.rlomm.mongodb.net/hbsLibrary"
const path = require("path")
const cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve(__dirname, "public")))
app.set('view engine', '.hbs');
app.engine('.hbs', hbs({extname: ".hbs"}));
app.use(router);
async function start() {
  try {
    await mongoose.connect(url, {
      useFindAndModify:false,
      useNewUrlParser:true,
      useUnifiedTopology:true
    });
    app.listen(3003, () => console.log('Server has been started...'))
  } catch (e) {
    console.log(e.message)
  }
}

start();