const wrapper =document.querySelector(".wrapper"),
inputPart = wrapper.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField =inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart =wrapper.querySelector(".weather-part"),
wIcon =document.querySelector(".weather-part img"),
arrowBack = wrapper.querySelector("header i");

let api;
inputField.addEventListener("keyup", e =>{
    // if user pressed enter btn and input value is not empty
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
    }
});

locationBtn.addEventListener("click", ()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }else{
        alert("your browser not support geolocation api");
    }
});


function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c9785c52a18aa5c823ba523dc7d5f595`;
    fetchData();
}
function onSuccess(position){
    const {latitude, longitude} = position.coords;
     api =`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=c9785c52a18aa5c823ba523dc7d5f595`;
     fetchData();   
}
function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}




function fetchData(){
    infoTxt.innerText = "Getting Weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
   
   if(info.cod == "404"){
       infoTxt.classList.replace("pending", "error");
       infoTxt.innerText = `${inputField.value} isn't valid city`;
   }else{

        const city = info.name;
        const country =info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if( id == 800){
            wIcon.src = "icons/clear.svg";
        }else if (id >= 200 && id<= 232){
            wIcon.src = "icons/strom.svg";
        }
        else if (id >= 600 && id<= 622){
            wIcon.src = "icons/snow.svg";
        }
        else if (id >= 701 && id<= 781){
            wIcon.src = "icons/haze.svg";
        }
        else if (id >= 801 && id<= 804){
            wIcon.src = "icons/cloud.svg";
        }
        else if ((id >= 300 && id<= 321) || ( id >= 500 && id <= 531 )){
            wIcon.src = "icons/rain.svg";
        }

        ///////////

        wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
        wrapper.querySelector(".weather").innerText = description;
        wrapper.querySelector(".location span").innerText = `${city},${country}`;
        wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        wrapper.querySelector(".humidity").innerText = `${humidity}%`;

       infoTxt.classList.remove("pending","error");
       infoTxt.innerText = "";
       inputField.value = "";
       wrapper.classList.add("active");
   }
}
arrowBack.addEventListener("click", ()=> {
    wrapper.classList.remove("active");
})



















