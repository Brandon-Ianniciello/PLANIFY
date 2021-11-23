import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location'
const useGeoLocation = () => {
    
    /*coordonnées de lio*/
    const [lat,setLat] = useState(45.642249982790126)
    const [lng,setLng] = useState(-73.8423519855052)
    
    useEffect(() => {
        console.log("Getting the phone position...")
        if (!('geolocation' in navigator)) {
            alert("Geolocation not supported")
        }
        Location.installWebGeolocationPolyfill()
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("..")
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        });
    }, [])

    return ({latitude:lat,longitude:lng})
}

export default useGeoLocation;