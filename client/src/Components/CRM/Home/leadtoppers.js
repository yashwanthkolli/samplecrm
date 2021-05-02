import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function LeadToppersGraph() {
    const userData = decodeSessionStorage().payload;

    const [leadToppers, setLeadToppers] = useState([])
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])
    const [websiteLeads, setWebsiteLeads] = useState('')

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_LEADS}/getLeadToppers`, { email: userData.Email })
            .then(res => setLeadToppers(res.data.count))
            .catch(err => {})
        axios.post(`${process.env.REACT_APP_LEADS}/getWebsiteLeadsCount`, { email: userData.Email })
            .then(res => setWebsiteLeads(res.data.count[0].count))
            .catch(err => {})
    }, [userData.Email])

    useEffect(() => {
        setNames(leadToppers.map( lead => lead.AssignedTo))
        setValues(leadToppers.map( lead => lead.count))
    }, [leadToppers])

    return (
        <React.Fragment>
            <Plot divId='toppers-plot'
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
                    Plotly.restyle('toppers-plot', update, [tn]);
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
                    Plotly.restyle('toppers-plot', update, [tn]);
                }}
                layout = {{
                    title: 'Lead Toppers',
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
            <div className='website-pool-data'>Website lead pool- {websiteLeads}Leads</div>
        </React.Fragment>
    );
}

export default LeadToppersGraph