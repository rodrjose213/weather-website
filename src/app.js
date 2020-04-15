const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Main page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jose'
    })
})

// About
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jose'
    })
})

// Help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'You need help?',
        name: 'Jose'
    })
})

//Weather
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        notFoundMsg: 'Help page does not exist',
        name: 'Jose'
    })
})

//Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            // change this to only error
            return res.send({ error });
        }
        else {
            forecast(latitude, longitude, (forecastError, forecastResponse) => {
                if (forecastError) res.send({ error: 'Unable to get weather information' });
                else {
                    res.send({
                        forecast: forecastResponse,
                        location,
                        address: req.query.address
                    });
                }
            })
        }
    });

})

app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

//Not found
app.get('*', (req, res) => {
    res.render('notfound', {
        notFoundMsg: 'My 404 page',
        name: 'Jose'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});