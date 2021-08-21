const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'));

const favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/img/logo.png'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});