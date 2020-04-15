const request = require('request');

const darkSkyKey = 'f414483a26e69cbf8053dcedeea426a5';


const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/${darkSkyKey}/${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to reach weather service.');
        } else if (!body || !body.currently) {
            callback({ Error: 'Location provided could not be found' });
        } else {
            const { currently } = body;
            callback(undefined, `It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
        }
    });

}

module.exports = forecast