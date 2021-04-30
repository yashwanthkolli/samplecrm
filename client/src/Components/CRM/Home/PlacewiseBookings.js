import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function PlacewiseBookingsGraph() {
    const toast = useToast();
    const userData = decodeSessionStorage().payload;

    const [venues, setVenues] = useState([])
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect( () => {
        const year = new Date().getFullYear().toString()
        const month = new Date().getMonth() >= 10 ? new Date().getMonth().toString() : `0${new Date().getMonth().toString()}`
        axios.post(`${process.env.REACT_APP_LEADS}/currentMonthLeads`, { 
            email: userData.Email,
            fromDate: `${year}-${month}-01 00:00:00`,
            toDate: `${year}-${month}-30 00:00:00`
        })
        .then(res => setVenues(res.data.count))
        .catch(err => {})
    }, [toast, userData.Email])

    useEffect(() => {
        setNames(venues.map( lead => lead.Venue))
        setValues(venues.map( lead => lead.count))
    }, [venues])

    return (
        <React.Fragment>
            <Plot divId='placebooking-plot'
                data={[
                    {
                        x: names,
                        y: values,
                        text: ['Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample'],
                        hovertemplate:
                            "<b>%{x}</b><br><br>" +
                            "%{yaxis.title.text}: %{y}<br>" +
                            "<extra></extra>",
                        type: 'bar',
                        marker: {color: ['#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999']},
                        name: 'Line Chart',
                    }
                ]}
                onHover = {(data) => {
                    var pn='',
                        tn='',
                        colors=[];
                    pn = data.points[0].pointNumber;
                    tn = data.points[0].curveNumber;
                    colors = data.points[0].fullData.marker.color
                    colors[pn] = '#202950';
                    var update = {'marker':{color: colors, size:16}};
                    Plotly.restyle('placebooking-plot', update, [tn]);
                }}
                onUnhover = {(data) => {
                    var pn='',
                        tn='',
                        colors=[];
                    for(var i=0; i < data.points.length; i++){
                        pn = data.points[i].pointNumber;
                        tn = data.points[i].curveNumber;
                        colors = data.points[i].fullData.marker.color;
                    };
                    colors[pn] = '#999999';

                    var update = {'marker':{color: colors, size:10}};
                    Plotly.restyle('placebooking-plot', update, [tn]);
                }}
                layout = {{
                    title: 'Current Month Bookings',
                    xaxis: {
                    title: '',
                    showgrid: false,
                    zeroline: false
                    },
                    yaxis: {
                    title: 'Bookings',
                    showgrid: true,
                    titlefont: {
                        size: '20'
                    }
                    }
                }}
                config = {{
                    displaylogo: false,
                    modeBarButtonsToRemove: ['lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'pan2d', 'resetScale2d', 'select2d', 'zoom2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d']
                }}
                useResizeHandler = {true}
                style = {{width: "100%", height: "100%"}}
            />
        </React.Fragment>
    );
}

export default PlacewiseBookingsGraph