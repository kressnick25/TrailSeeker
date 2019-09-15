import axios from "axios";

const GOOGLE_API_KEY = 'AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWU';
//const GOOGLE_API_KEY = 'AIzaSyBAeo-vXKY-RSDl3YIT2SKsDZrc67ejQWv';
const WEATHER_API_KEY = '4dd6049677f3443d7241f189a8fe20f1';

export async function requestGoogle (originLat, originLng, destinationLat, destinationLong, res){
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
    return await axios.get(url, {
        params: {
            // request Celcius and KM/h
            units: "ca",
        }
    });
}

export async function requestTrails (lat, lng) {
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
}

export async function requestLocation(ip, res) {
    // Development Ip
    //const ip = "131.181.158.22";
    const apiKey = "?api-key=687368cfc3fb6c8d351412dcb4cf7455f0d688ecda35962595685e04";
    const url = "https://api.ipdata.co/" + ip + apiKey;
    try {
        return await axios.get(url);
    } catch (error) {
        console.error('RequestError: failed to get location from IPdata API. Client IP was: ' + ip);
        // send error to client
        res.status(400);
        res.send(JSON.stringify({"error": "IP received was: " + ip + " Ensure server is running on an external network."}));
    }

}