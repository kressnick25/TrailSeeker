var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const path=require('path');
const requestIp = require('request-ip');
import {requestGoogle, requestWeather, requestTrails, requestLocation} from '../src/request';

const DEFAULT_LAT = '-27.436350';
const DEFAULT_LNG = '153.002120';

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Trail Seeker' });
// });

router.get('/api', function (req, res, next) {
    //check params have been supplied
    //return next(createError(400, 'lat and lng are required parameters'));
    // get client ip via middleware
    const clientIp = requestIp.getClientIp(req);
    // Geolocate client location
    requestLocation(clientIp)
        .then((response) => {
            let lat = response.data.latitude;
            let lng = response.data.longitude;
            requestTrails(lat, lng)
                .then(response => {
                    if (response.data.results) {
                        // Get weather info for each Trail
                        let trails = response.data.data;
                        let fetches = [];
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
                                            let elements = response.data.rows[0].elements[0]
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
