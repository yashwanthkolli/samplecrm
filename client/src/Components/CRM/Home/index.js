import React from 'react';
import MapRepresentation from './MapRepresentation'
import ReactTooltip from "react-tooltip";
import LeadToppersGraph from './leadtoppers';
import PlacewiseBookingsGraph from './PlacewiseBookings';
import LastFifteenDaysGraph from './LastFifteenDays';
import Sources from './Sources';
import CoursesGraph from './Course';
import './styles.css'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

function Home(){
    const userData = decodeSessionStorage().payload;

    return(
        userData.Type === "National Head" || userData.Type === "Admin" ?
        <div style={{background: '#E0E0F8', display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
            <div className='home-page'>
                <div className='monthly-booking'>
                    <PlacewiseBookingsGraph />
                </div>

                <div className='sources-chart'>
                    <Sources />
                </div>
                
                <div className='toppers-graph'>
                    <LeadToppersGraph />
                </div>

                <div className='courses-chart'>
                    <CoursesGraph />
                </div>

                <div className='past-leads-graph'>
                    <LastFifteenDaysGraph />
                </div>

                <div className='leads-map'>
                    <h1 className='map-heading'>Citywise Leads</h1>
                    <MapRepresentation />
                    <ReactTooltip />
                </div>
            </div>
        </div>
        :
        <></>
    )
}

export default Home;