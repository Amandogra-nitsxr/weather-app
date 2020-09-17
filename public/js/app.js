const form = document.querySelector("form");
const search = document.querySelector("input");
const message = document.querySelector('#message')

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;
    message.textContent = "Loading..."
  axios
    .get("/weather", {
      params: {
        address: location,
      },
    })
    .then((response) => {
        if(response.data.error){
            message.textContent = response.data.error
        }else{
            message.textContent = `The temperature is ${response.data.forecastData.temperature} with probability of ${response.data.forecastData.rain} at ${response.data.place}`
        }
      })
});
