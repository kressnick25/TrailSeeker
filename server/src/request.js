import axios from "axios";

const GOOGLE_API_KEY = 'AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWU';
const WEATHER_API_KEY = '4dd6049677f3443d7241f189a8fe20f1';

export async function requestGoogle (originLat, originLng, destinationLat, destinationLong){
    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json';
    let origin = originLat + ',' + originLng;
    let destination = destinationLat + ',' + destinationLong;
    try{
        return await axios.get( url, {
            params: {
                origins: origin,
                destinations: destination,
                units: 'metric',
                key: GOOGLE_API_KEY,
            }
        }
        )} catch (error) {
        console.error(error);
    }
}

export async function requestWeather (lat, lng) {
    // Format url for weird api standard
    let url = "https://api.darksky.net/forecast/" + WEATHER_API_KEY + "/" + lat + "," + lng;
    try{
        return await axios.get(url, {
            params: {
                // request Celcius and KM/h
                units: "ca",
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function requestTrails (lat, lng) {
    try{
        return await axios.get("https://trailapi-trailapi.p.rapidapi.com/trails/explore/", {
            params: {
                lat: lat,
                lon: lng,
            },
            headers: {
                'x-rapidapi-host': 'trailapi-trailapi.p.rapidapi.com',
                'x-rapidapi-key': '9357762584mshd7e19dbaf4c4e70p1d44f6jsn00c1586a8c94',
            }
        });
    } catch (error) {
        console.error(error);
    }
}

export async function requestLocation(ip) {
    // DEVELOPMENT VAR
    ip =  "131.181.158.12";
    try {
        return await axios.get("https://api.ipdata.co/" + ip + "?api-key=687368cfc3fb6c8d351412dcb4cf7455f0d688ecda35962595685e04")
    } catch (error) {
        console.error(error);
    }

}