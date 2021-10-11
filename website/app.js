// Personal API Key for OpenWeatherMap API
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '62eac2ad377f4082e0e45d28a4c12900';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
  const newZip =  document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;
  if (newZip == ''){
    alert('Please enter a Zip Code');
  }

  getWeatherData(baseURL,newZip, apiKey)

  .then(function(data){
    if (data.cod == 404){
      alert(data.message);
    }

    postData('/addWeather', {temperature: data.main.temp, date: data.dt, feelings: feelings});
    updateInterface()
  })

}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, key)=>{
  const res = await fetch(`${baseURL}${zip},US&appid=${key}&units=metric`);
    
  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log("error", error);
  }
}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData
    } catch(error) {
      console.log("error", error);
    }
}

/* Function to GET Project Data */
updateInterface = async() => {
  const request = await fetch('/all');
  try{
    const data = await request.json();
    document.getElementById('temp').innerHTML = " " + data.temperature + "&#8451;";
    document.getElementById('date').innerHTML = " " + data.date;
    document.getElementById('content').innerHTML = " " + data.feeling;

  } catch{
    console.log("error", error);
  }
}

