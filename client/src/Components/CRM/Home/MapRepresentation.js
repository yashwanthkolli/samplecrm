import React, { useEffect, useState } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import ReactTooltip from "react-tooltip";
import { decodeSessionStorage } from "../../../helpers/auth.helpers";

//Map Topo
const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

//Markers Data
const markers = [
    { markerOffset: -25, name: "Bhopal", coordinates: [77.4126, 23.2599]},
    { markerOffset: 15, name: "Bangalore", coordinates: [77.5946, 12.9716] },
    { markerOffset: -25, name: "Delhi", coordinates: [77.1025, 28.7041] },
    { markerOffset: -25, name: "Ahmedabad", coordinates: [72.4714, 23.0225] },
    { markerOffset: -25, name: "Mumbai", coordinates: [72.8777, 19.0760] },
    { markerOffset: 15, name: "Amritsar", coordinates: [74.8723, 31.6340] },
    { markerOffset: 15, name: "Pune", coordinates: [73.8567, 18.5204] },
    { markerOffset: -25, name: "Patna", coordinates: [85.1376, 25.5941] },
    { markerOffset: -25, name: "Lucknow", coordinates: [81.5426, 26.8467] },
    { markerOffset: -25, name: "Chandigarh", coordinates: [76.7794, 30.7333] },
    { markerOffset: 15, name: "Surat", coordinates: [21.1702, 72.8311] },
    { markerOffset: 15, name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { markerOffset: 15, name: "Indore", coordinates: [75.8577, 22.7196] },
    { markerOffset: 15, name: "Kanpur", coordinates: [80.3319, 26.4499] },
    { markerOffset: 15, name: "Varanasi", coordinates: [82.9739, 25.3176] },
    { markerOffset: 15, name: "Jabalpur", coordinates: [79.9864, 23.1815] },
    { markerOffset: 15, name: "Bhubaneswar", coordinates: [85.8245, 20.2961] },
    { markerOffset: 15, name: "Nagpur", coordinates: [79.0882, 21.1458] },
    { markerOffset: 15, name: "Noida", coordinates: [77.3910, 27.5355] },
    { markerOffset: 15, name: "Hyderabad", coordinates: [78.4867, 17.3850] },
    { markerOffset: 15, name: "Jaipur", coordinates: [74.7873, 26.9125] }
];

const MapRepresentation = () => {
    const toast = useToast();
    const userData = decodeSessionStorage().payload;

    const [leads, setLeads] = useState([])
    const [totalLeads, setTotalLeads] = useState()
    const [markersData, setMarkersData] = useState([])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_LEADS}/getPlaceLeads`, { email: userData.Email })
            .then(res => setLeads(res.data.leads))
            .catch(err => {
                toast({
                    description: "Error in fetching place-wise leads",
                    duration: 2000,
                    position: "top"
                })
            })
        axios.post(`${process.env.REACT_APP_LEADS}/getNoOfLeads`, { email: userData.Email })
            .then(res => setTotalLeads(res.data.count[0].count))
            .catch(err => {
                toast({
                    description: "Error in fetching total leads",
                    duration: 2000,
                    position: "top"
                })
            })
    }, [toast, userData.Email])

    useEffect(() => {
        const markerData = [];
        const cities = []
        for(var i = 0; i<markers.length; i++){
            for(var j = 0; j<leads.length; j++){
                if(leads[j].City.toLowerCase().includes(markers[i].name.toLowerCase())){
                    if(!cities.includes(markers[i].name)){
                        markerData.push({...markers[i], ...leads[j]})
                        cities.push(markers[i].name)
                    } else {
                        const id = cities.indexOf(markers[i].name)
                        markerData[id] ? markerData[id].count = markerData[id].count + leads[j].count : markerData[id] = undefined
                    }
                }
            }
        }
        setMarkersData(markerData)
    }, [leads])

    return (
        <React.Fragment>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                projectionConfig={{
                    rotate: [280, -22, -0.75],
                    scale: 1100
                }}
                >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies
                        .filter(d => d.properties.REGION_UN === "Asia")
                        .map(geo => (
                        <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={geo.properties.NAME === "India" ? "#A9A9A9" : "#DCDCDC"}
                            stroke="#D6D6DA"
                            style={{
                            default: { outline: "none" },
                            hover: { outline: "none" },
                            pressed: { outline: "none" },
                            }}
                        />
                        ))
                    }
                </Geographies>
                {markersData.map(({ name, coordinates, markerOffset, count }) => (
                    <Marker
                    key={name} 
                    coordinates={coordinates} 
                    data-tip={`${name} - Leads=${count}`}
                    onMouseEnter={ () => {
                        ReactTooltip.rebuild()

                    }} 
                    >
                    <text
                        textAnchor="middle"
                        style={{ fontFamily: "Nunito, sans-serif", fill: "#202950", fontSize: '20px', fontWeight: 'bold' }}
                    >{count}</text>
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                    </Marker>
                ))}
            </ComposableMap>
            <div className='others'>Others- {markersData.length ? totalLeads - markersData.reduce((a, b) => ({count: a.count + b.count})).count : 0}</div>
        </React.Fragment>
    );
};

export default MapRepresentation;
