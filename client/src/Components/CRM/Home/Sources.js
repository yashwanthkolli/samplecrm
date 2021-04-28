import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function Sources() {
    const toast = useToast();
    const userData = decodeSessionStorage().payload;
    
    const [sources, setSources] = useState([])
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_LEADS}/sourceCount`, { email: userData.Email })
        .then(res => setSources(res.data.sources))
        .catch(err => {
            toast({
                description: "Error in fetching sources",
                duration: 2000,
                position: "top"
            })
        })
    }, [toast, userData.Email])

    useEffect(() => {
        setNames(sources.map( source => source.Source))
        setValues(sources.map( source => source.count))
    }, [sources])

    return (
        <React.Fragment>
            <Plot divId='sources-plot'
                data={[
                    {
                        labels: names,
                        values: values,
                        hoverinfo: 'label+percent+value',
                        type: 'pie',
                        marker: {colors: ['#384b7e', '#122425', '#223565', '#243739', '#060404', '#202950', '#065499']},
                        name: 'Line Chart',
                    }
                ]}
                layout = {{
                    title: 'Lead Sources',
                    titlefont: {
                        size: '20'
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

export default Sources