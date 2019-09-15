import express from "express";
import path from "path";
import requestIp from "request-ip";
import {requestGoogle, requestWeather, requestTrails, requestLocation} from '../src/request';

const router = express.Router();

// Single API endpoint. Returns JSON with Trails, Weather data and driving distance
router.get('/api', async function (req, res, next) {
    // get client ip via middleware
    const clientIp = requestIp.getClientIp(req).replace("::ffff:", '');

    // Geolocate client location
    let lat, lng;
    let response;
    // able to run in test mode when running locally
    // to demonstrate functionality
    if (req.query.test === 'True'){
        lat = "-27.358";
        lng = "153.0405";
    } else {
        try {
            response = await requestLocation(clientIp, res);
            lat = response.data.latitude;
            lng = response.data.longitude;
        }
        catch(err) { return next(err) }
}

    // Get trails list from Trail API
    try {
        response = await requestTrails(lat, lng);
    } catch (err) {
        console.error('RequestError: Trails API request failed'); // log to console
        // send error to client
        res.status(500);
        res.send(JSON.stringify({"error": "Failed to get list of trails from API"}));
        return next();
    }

    // Get weather info for each Trail
    // trim repsonse to only data needed
    let output = {};
    let trails = response.data.data.map((trail) => {
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

    // return user details
    if (req.query.test === 'True'){
        output.userIp = clientIp;
        output.userLat = 'DEMO ' + lat;
        output.userLng = 'DEMO ' + lng;
    } else {
        output.userIp = clientIp;
        output.userLat = lat;
        output.userLng = lng;
    }

    let fetches = [];
    for (let i = 0; i < trails.length; i++) {
        // push each fetch promise to array
        fetches.push(
            // request weather data from Dark Sky API for current trail
            requestWeather(trails[i].lat, trails[i].lon, res)
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
                .catch((err) => {
                    console.error('RequestError: failed to fetch data from Dark Sky Weather API');
                    trails[i].weatherError = "Failed to get Weather Data"
                })
        );

        // push each fetch promise in array
        fetches.push(
            // Get Google distance info for each Trail
            requestGoogle(lat, lng, trails[i].lat, trails[i].lon, res)
                .then(response => {
                    if (response.data.status === 'REQUEST_DENIED'){
                        console.error('RequestError: GoogleMaps invalid API key');
                        trails[i].travelError = "Google Maps API lookup failed";
                    }
                    else if (response.data.rows) {
                        let elements = response.data.rows[0].elements[0];
                        trails[i].distance = elements.distance.text;
                        trails[i].duration = elements.duration.text;
                    }
                })
                .catch((err) => {
                    console.error('RequestError' + err);
                    trails[i].travelError = "Google Maps API lookup failed";
                })
                );
    }

    // Wait for every promise in loop to fulfil before sending response
    Promise.all(fetches)
        .then(() => {
            output.trails = trails;
            res.json(output)
        });

});

// Serve React static build
router.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});


module.exports = router;
