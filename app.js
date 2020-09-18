

window.addEventListener('load',()=>{
    let long;
    let lat;
    let locationTimezone=document.querySelector('.location-timezone')
    let temperatureDescription=document.querySelector('.temperature-description')
    let temperatureDegree=document.querySelector('.temperature-degree')
    let temperatureSection=document.querySelector('.temperature')
    let temperatureSpan=document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long=position.coords.longitude
            lat=position.coords.latitude

            const api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=26432faf268f1bb57ed24dd6d3565bf6&units=metric`
            
            fetch(api)
            .then(response =>{
                return response.json()
            })
            .then(data =>{
                const {name}=data
                const {temp}=data.main
                const {description, icon} =data.weather[0]
                
                //set DOM Elements from api
                temperatureDegree.textContent=temp
                temperatureDescription.textContent=description
                locationTimezone.textContent=name
                
                //formula for celcius
                let fahrenheit=(temp*9/5)+32
                
                //set icon
                const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
                document.getElementById("cloudImg").src=imageURL
                
                //change temperature to celsius/Farenhit
                temperatureDegree.addEventListener('click',()=>{
                    if(temperatureSpan.textContent==="F"){
                        temperatureSpan.textContent="C"
                        temperatureDegree.textContent = temp
                    }else{
                        temperatureSpan.textContent="F"
                        temperatureDegree.textContent = fahrenheit
                    }
                })

            })
        })
    }
})