import express from "express";
import bodyParser from "body-parser";
import axios from "axios"

const api_key = "8a0d53b6b0163fe8bdb4a004067f5e97"
const app = express();
const port = 3000;

app.use(express.static("public"))



app.get("/", (req, res)=>{
    res.render("index.ejs");
})

app.use(bodyParser.urlencoded({ extended: true }));

app.post("/getoutput", async(req, res)=>{
    const city = req.body.city;
    try{

        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
        const temp = result.data.main.temp;
        const ima = result.data.weather[0].icon;
        res.render("index.ejs", {
            content: result.data,
            temp_: Math.floor(temp-273.15),
            iconcode : "http://openweathermap.org/img/w/" + ima + ".png",
        });
    } catch(error){
        console.log(error.message);
        res.render("index.ejs", {budget: "result not found"})
    }
});

app.listen(port, ()=>{
    console.log(`ajay's server is running on ${port}`);
})

const jaffa = {"coord":{"lon":83.0167,"lat":17.6833},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"base":"stations","main":{"temp":302.12,"feels_like":307.38,"temp_min":302.12,"temp_max":302.12,"pressure":1005,"humidity":78,"sea_level":1005,"grnd_level":1002},"visibility":10000,"wind":{"speed":3.13,"deg":237,"gust":4.15},"rain":{"1h":0.18},"clouds":{"all":100},"dt":1719755219,"sys":{"type":1,"id":9255,"country":"IN","sunrise":1719705377,"sunset":1719752800},"timezone":19800,"id":1278688,"name":"Anakapalle","cod":200}

console.log(jaffa.weather[0].id)


