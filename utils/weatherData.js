const constants = require("../config")
const request = require("request")

const weatherData = (address,callback)=>{
    const url = constants.prefix+encodeURIComponent(address)+constants.suffix
    request({url,json:true},(error,{body})=>{
        //console.log(body)
        if(error){
            callback("oops!Something went wrong.",undefined)
        }else if(!body.main || !body.weather || !body.name || !body.main.temp){
            callback("Unable to fetch data.",undefined)
        }else{
            callback(undefined,{
                temperature:body.main.temp,
                description:body.weather[0].description,
                name:body.name
            })
        }
    })
}

module.exports = weatherData