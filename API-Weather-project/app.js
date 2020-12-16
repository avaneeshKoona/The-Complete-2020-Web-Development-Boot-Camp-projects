const express = require("express");
const bodyParser = require('body-parser')
const https=require("https");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));


app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html")

});

app.post("/", function(req, res) {
  const cityName = req.body.cityInput;
  const apiKey = process.env.API_KEY;
  const units = "metric";

  const url = process.env.URL + cityName + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response) {

    console.log(response.statusCode);

    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const wdata = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imgUrl=" http://openweathermap.org/img/wn/"+icon+"@2x.png"


      res.write("<p>The weather in "+cityName+" is, "+wdata+"</p>");
      res.write("<h1>Temperature in "+cityName+" is "+temp+" degrees celcius</h1>");
      res.write("<img src="+imgUrl+">");
      res.send();

    });

  })


})

app.listen(3000, function() {
  console.log("the server is running on port 3000");
});
