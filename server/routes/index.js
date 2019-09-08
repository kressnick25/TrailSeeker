import express from "express";
import createError from "http-errors";
import path from "path";
import requestIp from "request-ip";
import {requestGoogle, requestWeather, requestTrails, requestLocation} from '../src/request';

const router = express.Router();

let lat;
let lng;
let trails;
let fetches = [];
let elements;

// Single API endpoint. Returns JSON with Trails, Weather data and driving distance
router.get('/api', async function (req, res) {
    // get client ip via middleware
    const clientIp = requestIp.getClientIp(req);

    // Geolocate client location
    let response = await requestLocation(clientIp);

    lat = response.data.latitude;
    lng = response.data.longitude;

    // Get trails list from Trail API
    response = await requestTrails(lat, lng);

    // Get weather info for each Trail
    // trim repsonse to only data needed
    trails = response.data.data.map((trail) => {
        const {id, length, description, difficulty, rating, lat, lon, name} = trail;
        return {
            id: id,
            name: name,
            length: length,
            description: description,
            difficulty: difficulty,
            rating: rating,
            lat: lat,
            lon: lon,
        }
    });

    fetches = [];
    for (let i = 0; i < trails.length; i++) {
        // push each fetch promise to array
        fetches.push(
            // request weather data from Dark Sky API for current trail
            requestWeather(trails[i].lat, trails[i].lon)
                .then(response => {
                    if (response.data.currently) {
                        // add currentWeather value to trail object
                        // trim to necessary json data
                        const {temperature, humidity, windSpeed, precipProbability} = response.data.currently;
                        trails[i].currentWeather = {
                            temperature: temperature,
                            humidity: humidity,
                            windSpeed: windSpeed,
                            precipProbability: precipProbability,
                        };
                        trails[i].weather = response.data.daily.data.map((day) => {
                            const {time, temperatureHigh, temperatureLow, icon} = day;
                            return {
                                time: time,
                                temperatureHigh: temperatureHigh,
                                temperatureLow: temperatureLow,
                                icon: icon,
                            }
                        });
                    }
                })
                .catch(err => createError(500, "Error in Dark Sky Weather API request " + err))
        );

        // push each fetch promise in array
        fetches.push(
            // Get Google distance info for each Trail
            requestGoogle(lat, lng, trails[i].lat, trails[i].lon)
                .then(response => {
                    if (response.data.rows) {
                        elements = response.data.rows[0].elements[0];
                        trails[i].distance = elements.distance.text;
                        trails[i].duration = elements.duration.text;
                    }
                })
                .catch(err => createError(500, "Error in Google Distance API request " + err ))
        );
    }

    // Wait for every promise in loop to fulfil before sending response
    Promise.all(fetches)
        .then(() => res.json(trails));

});

// Serve static build
router.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


module.exports = router;
