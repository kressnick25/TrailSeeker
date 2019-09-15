import React from 'react';
import googleMapsLogo from './_img/googleMaps.png';
import darkSkyLogo from './_img/darkSky.png';
import trailsLogo from './_img/trailApi.png';
import ipdataLogo from './_img/ipdata.png';
export function MadeWith () {

    return (
        <div className={'MadeWith'}>
            <img src={darkSkyLogo} alt={'Logo from darksky.net'} />
            <img src={googleMapsLogo} alt={'Google Maps logo'} />
            <img src={trailsLogo} alt={'Trails API logo'}/>
            <img src={ipdataLogo} alt={'Logo from ipdata.co'} />
        </div>
    );
}

export default MadeWith;