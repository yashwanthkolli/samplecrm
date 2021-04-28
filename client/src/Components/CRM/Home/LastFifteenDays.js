import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function LastFifteenDaysGraph() {
    const toast = useToast();
    const userData = decodeSessionStorage().payload;
    
    const [data, setData] = useState([])
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_LEADS}/fifteenDaysLeads`, { email: userData.Email })
        .then(res => setData(res.data.leads))
        .catch(err => {
            toast({
                description: "Error in fetching previous leads",
                duration: 2000,
                position: "top"
            })
        })
    }, [toast, userData.Email])

    useEffect(() => {
        setNames(data.map( lead => lead.Createdt))
        setValues(data.map( lead => lead.count))
    }, [data])

    return (
        <React.Fragment>
            <Plot divId='fifteen-plot'
                data={[
                    {
                        x: names,
                        y: values,
                        text: ['Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample'],
                        hovertemplate:
                            "<b>%{x}</b><br><br>" +
                            "%{yaxis.title.text}: %{y}<br>",
                        type: 'lines+markers',
                        line: {color: '#202950'},
                        marker: {color: ['#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999']},
                        name: 'Line Chart',
                    }
                ]}
                layout = {{
                    title: 'Leads',
                    autosize: true,
                    xaxis: {
                    title: '',
                    showgrid: false,
                    zeroline: false
                    },
                    yaxis: {
                    title: 'Leads',
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

export default LastFifteenDaysGraph