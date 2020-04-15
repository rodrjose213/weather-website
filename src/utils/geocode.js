const request = require('request');

const mapBoxKey = 'pk.eyJ1Ijoicm9kcmpvc2UyMTMiLCJhIjoiY2s4bmVrejYwMHhsbTNmbndjeDRnam8zcCJ9.mLwqI8-HBga_zdXzCsWtpA';

const geocode = (address, callback) => {
    const addressURLEncoded = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressURLEncoded}.json?access_token=${mapBoxKey}`;

    request({ url, json: true }, (error, { body }) => {

        let responseBody = {
            longitude: 0,
            latitude: 0,
            location: 'Nowhere'
        }

        if (error) {
            callback('Unable to reach mapbox website.', responseBody);
        } else if (!body || !body.features[0]) {
            callback('Location provided could not be found', responseBody);
        } else {
            responseBody = {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }

            callback(undefined, responseBody);
        }
    });
};

module.exports = geocode;