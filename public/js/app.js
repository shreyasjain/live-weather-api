const tempElement = document.querySelector(".temperature span")
const locationElement = document.querySelector(".place")
const descElement = document.querySelector(".weatherCondition")
const weatherIcon = document.querySelector(".weatherIcon i")
const dateElement = document.querySelector(".date")
const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",]
const date = new Date().getDate() + "," + month[new Date().getDay()].substring(0, 3)
dateElement.textContent = date

const initialAddress = '/weather'
const address = document.querySelector(".weatherLocation input")

document.addEventListener("submit", (event) => {
    event.preventDefault()
    const url = initialAddress + "?address=" + address.value
    locationElement.textContent = "Loading..."
    tempElement.textContent = ""
    descElement.textContent = ""
    fetch(url).then((response) => {
        response.json().then(data => {
            if (data.error) {
                locationElement.textContent = data.error
                tempElement.textContent = ""
                descElement.textContent = ""
            }
            else {
                if(data.description==="rain"||data.description==="fog"){
                    weatherIcon.className="wi wi-day-"+data.description
                }else{
                    weatherIcon.className="wi wi-day-cloudy"
                }
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176)
                descElement.textContent = data.description
                locationElement.textContent = data.name
            }
        })
    })
})