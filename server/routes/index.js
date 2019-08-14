var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const path=require('path');
import {requestGoogle, requestWeather, requestTrails} from '../src/request';

const DEFAULT_LAT = '-27.436350';
const DEFAULT_LNG = '153.002120';

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Trail Seeker' });
// });

router.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

router.post('/', function (req, res, next) {
    //check params have been supplied
    if (!req.body.lat || !req.body.lng){
      return next(createError(400, 'lat and lng are required parameters'));
    }
    let lat = req.body.lat;
    let lng = req.body.lng;
    requestTrails(lat, lng)
        .then(response => {
            if (response.data.results) {
                // Get weather info for each Trail
                let trails = response.data.data;
                let fetches = [];
                for (let i = 0; i < trails.length; i++) {
                    fetches.push(
                        requestWeather(trails[i].lat, trails[i].lon)
                            .then(response => {
                                if (response.data.currently) {
                                    // add currentWeather value to trail object
                                    trails[i].weather = response.data.daily.data;
                                }
                            })
                            .catch(err => createError(500, "Error in Dark Sky Weather API request " + err))
                    );
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
                Promise.all(fetches)
                    .then(() => res.json(trails));
            }
        })
        .catch(err => createError(500, "Error in Trails API request " + err));


});


module.exports = router;
