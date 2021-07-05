const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query = req.body.cityName;
  const appid = "b5875a4a6a94fe76fbb44a5fa6d09dbd";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ appid + "&units="+ unit;

  https.get(url, function(response){

    response.on("data",function(data){
    const weatherData = JSON.parse(data);
  const temp = weatherData.main.temp;
  const icon = weatherData.weather[0].icon;
  const imgurl = "https://openweathermap.org/img/wn/"+ icon + "@2x.png";
  const desc = weatherData.weather[0].description;

    res.render('report', {query:query, temperature: temp, weatherIcon: icon, imgurl : imgurl, description: desc});

  });
  });
})



app.listen(3000);
