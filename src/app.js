const hbs = require("hbs")
const express = require('express')
const path = require("path")
const weatherData = require("../utils/weatherData")

const app = express()
const port = process.env.PORT || 3000

const publicPath = path.join(__dirname,"../public")
const partialsPath = path.join(__dirname,"../templates/partials")
const viewsPath = path.join(__dirname,"../templates/views")

app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Live WeatherAPI"
    })
})

app.get("/weather",(req,res)=>{
    const address = req.query.address
    if(!address){
        return res.send({error:"Please enter an address."})
    }
    weatherData(address,(error,{temperature,description,name}={})=>{
        if(error){
            res.send({error:error})
        }else{
            res.send({temperature,description,name})
        }
    })
    
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"Error..!"
    })
})

app.listen(port,()=>{
    console.log("Listening on port:",port)
})