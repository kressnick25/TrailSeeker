var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const path=require('path');
const requestIp = require('request-ip');
import {requestGoogle, requestWeather, requestTrails, requestLocation} from '../src/request';

// define vars outside loop to prevent memory leak
let lat;
let lng;
let trails;
let fetches = [];
let elements;
// Single API endpoint. Returns JSON with Trails, Weather data and driving distance
router.get('/api', function (req, res) {
    // get client ip via middleware
    const clientIp = requestIp.getClientIp(req);
    // Geolocate client location
    requestLocation(clientIp)
        .then((response) => {
            lat = response.data.latitude;
            lng = response.data.longitude;
            // Get trails list from Trail API
            requestTrails(lat, lng)
                .then(response => {
                    if (response.data.results) {
                        // Get weather info for each Trail
                        trails = response.data.data;
                        fetches = [];
                        for (let i = 0; i < trails.length; i++) {
                            // push each fetch promise to array
                            fetches.push(
                                // request weather data from Dark Sky API for current trail
                                requestWeather(trails[i].lat, trails[i].lon)
                                    .then(response => {
                                        if (response.data.currently) {
                                            // add currentWeather value to trail object
                                            trails[i].currentWeather = response.data.currently;
                                            trails[i].weather = response.data.daily.data;
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
                    }
                })
                .catch(err => createError(500, "Error in Trails API request " + err));
        })
        .catch(err => createError(500, "Error in IpData API request" +  err))
});

// Serve static build
router.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


module.exports = router;
