import React from "react";

export function Trail (props) {
    let data = props.data;
    return (
        <div className="Trail">
            <h2>{data.name}</h2>
            <p>{data.description}</p>
            <p>Difficulty: <b>{data.difficulty}</b></p> 
            <p>Rating: <b>{data.rating}</b></p>
            <p>Current Weather: <b>{data.currentWeather}</b></p>
        </div>
    )
}

export default Trail;