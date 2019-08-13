var express = require('express');
var router = express.Router();
const createError = require('http-errors');
import {requestGoogle, requestWeather, requestTrails}  from '../src/request';
const axios = require('axios')



const DEFAULT_LAT = '-27.436350';
const DEFAULT_LNG = '153.002120';

/* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Trail Seeker' });
// });

router.post('/', function(req, res, next){
  // check params have been supplied
  // if (!req.body.lat || !req.body.lng){
  //   return next(createError(400, 'lat and lng are required parameters'));
  // }
  let lat = req.body.lat;
  let lng = req.body.lng;
  const getTrails = requestTrails(lat, lng)
    .then(response => {
      if (response.data.results) {
          // Get weather info for each Trail
          let trails = response.data.data;
          let c = 0;
          for (let i = 0; i < trails.length; i++) {
            requestWeather(trails[i].lat, trails[i].lon)
              .then(response =>{
                if (response.data.currently){
                  // add currentWeather value to trail object
                  trails[i].currentWeather = response.data.currently.summary;
                  c++;
                }
                // Wait for all api requests to complete before responding
                // TODO do this with promises 
                if (c  === trails.length - 1){
                  res.json(trails);
                }
              })
              .catch(err => console.log("Error in Dark Sky Weather API request\n", err));
            }

          // Get Google distance info for each Trail
          // trails.forEach(trail => {
          //   requestGoogle(lat, lng, trail.lat, trail.lng)
          //     .then(response => {
          //       if (response.data.rows){
          //         let elements = response.data.rows[0].elements[0]
          //         trail.distance = elements.distance;
          //         trail.duration = elements.duration;
          //       }
          //     })
          //     .catch(err => console.log("Error in Google Distance API request\n", err))
          // })
        }
    })
    .catch(err => console.log("Error in Trails API request", err));

    

});

module.exports = router;
