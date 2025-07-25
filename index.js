import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_KEY = "a32bb7fe511cc2dca3e440bbdea55f02";

const weatherImageMap = {
    Clear:     { bg: "clear.jpg",      icon: "clear.png" },
    Clouds:    { bg: "cloud.jpg",      icon: "cloud.png" },
    Rain:      { bg: "rain.jpg",       icon: "rain.png" },
    Drizzle:   { bg: "rain.jpg",       icon: "rain.png" },
    Thunderstorm: { bg: "thunder.jpg", icon: "thunder.png" },
    Tornado:   { bg: "thunder.jpg",    icon: "thunder.png" },
    Mist:      { bg: "mist.jpg",       icon: "mist.png" },
    Fog:       { bg: "mist.jpg",       icon: "mist.png" },
    Haze:      { bg: "mist.jpg",       icon: "mist.png" },
    Dust:      { bg: "mist.jpg",       icon: "mist.png" },
    Sand:      { bg: "sand.jpg",       icon: "sand.png" },
    Snow:      { bg: "snow.jpg",       icon: "snow.png" },
  };
  

app.use(express.static("public"));

app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{
        data:null,
        bgImage:"/media/bg/default.jpg",
    });
})

app.post('/', async (req, res) => {
    const city = req.body.city;
    try {
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const d = result.data;

      const weatherMain = result.data.weather[0].main;
      const weatherAssets = weatherImageMap[weatherMain] || { bg: "default.jpg", icon: "default.png" };
      
      res.render("index.ejs", {
        data: d,
        bgImage: `/media/bg/${weatherAssets.bg}`,
        iconImage: `/media/icon/${weatherAssets.icon}`,
      });
    } catch (err) {
      console.error(err);
      res.render('index.ejs', { 
        bgImage:"/media/bg/er.jpg",
        data: null 
    });
    }
  });

app.listen(port,()=>{
    console.log(`Server running on port: ${port}...`);
})
