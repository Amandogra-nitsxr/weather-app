const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c01e5b2360ccfbf324352e73302c75cd&query=${latitude},${longitude}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({ error: "Something went wrong!!" });
    } else if (body.error) {
      callback({ error: "Can't find the location. Try other search!!" });
    } else {
      callback(null, {
        temperature: body.current.temperature,
        rain: body.current.precip,
      });
    }
  });
};

module.exports = forecast;
