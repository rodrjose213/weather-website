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
            callback(undefined, {
                temperature: `It is currently ${currently.temperature} degrees out.`,
                precipProbability: `There is a ${currently.precipProbability}% chance of rain.`,
                summary: `${currently.summary}. Feels like ${currently.apparentTemperature} degrees out.`,
                wind: `Expect wind speed of ${currently.windSpeed}mph and wind gusts up to ${currently.windGust}mph.`,
                cloudCoverage: `Cloud coverage rating is ${currently.cloudCover} and visibility is ${currently.visibility} miles.`
            });
        }
    });

}

module.exports = forecast