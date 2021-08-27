require("dotenv").config();
const express = require('express');
const app = express();
const nodemailer = require("nodemailer");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

const favicon = require('serve-favicon');
app.use(favicon(__dirname + "/public/img/robin.png"));

app.get("/", function (req, res) {
  let message = req.query.message;
  if (!message) message = "none";

  res.render("index", {
    message: message
  });
});

app.post("/message", async function (req, res) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NOREPLYUSER,
      pass: process.env.NOREPLYPW
    }
  });
    
  var mailOptions = {
    from: process.env.NOREPLYUSER,
    to: "robinweitzman3579@gmail.com",
    subject: 'Message from your Portfolio Page!!!',
    html: `<h2>Message from your Portfolio Page:<h2><br><br>` +
      `<h3>${req.body.name}</h3>` +
      `<h4>${req.body.email}</h4><br>` + 
      `<p>${req.body.message}</p><br><br><br><br>` + 
      `<p>Good luck and stay safe! - Wyatt</p>`,
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);

      res.redirect("/?message=fail#contact");
    } 
    else {
      res.redirect("/?message=success#contact");
    }
  });
  
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});