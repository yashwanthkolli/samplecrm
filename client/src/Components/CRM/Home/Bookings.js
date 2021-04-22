import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function BookingsGraph() {
    const [monthlyData, setMonthlyData] = useState([])
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    // const year = new Date().getFullYear()
    //     const currentMonth = new Date().getMonth()+1 < 10 ? '0'+(new Date().getMonth()+1).toString() : (new Date().getMonth()+1).toString()
    //     const months = [
    //         {month: 'Jan', id: '01', year: '', leads: 0},
    //         {month: 'Feb', id: '02', year: '', leads: 0},
    //         {month: 'Mar', id: '03', year: '', leads: 0},
    //         {month: 'Apr', id: '04', year: '', leads: 97},
    //         {month: 'May', id: '05', year: '', leads: 0},
    //         {month: 'Jun', id: '06', year: '', leads: 0},
    //         {month: 'Jul', id: '07', year: '', leads: 0},
    //         {month: 'Aug', id: '08', year: '', leads: 0},
    //         {month: 'Sep', id: '09', year: '', leads: 0},
    //         {month: 'Oct', id: '10', year: '', leads: 0},
    //         {month: 'Nov', id: '11', year: '', leads: 0},
    //         {month: 'Dec', id: '12', year: '', leads: 0}
    //     ]
    //     months.forEach(month => {
    //         month.id <= currentMonth ? month.year = year :  month.year = year-1
    //     })
    //     months.forEach(month => {
    //         axios.post(`${process.env.REACT_APP_LEADS}/getBookingsByDates`, { 
    //             email: JSON.parse(localStorage.getItem('user')).Email,
    //             fromDate: `${month.year}-${month.id}-01`,
    //             toDate: `${month.year}-${month.id}-30`
    //         })
    //             .then(res => {
    //                 month.leads = res.data.leads[0].count
    //                 // setValues(prevState => [...prevState, res.data.leads[0].count])
    //             })
    //             .catch(err => console.log(err))
    //     })
    //     const data = months.slice(currentMonth, months.length).concat(months.slice(0, currentMonth))

    // // useEffect(() => {
    // //     setNames(data.map(data => data.month))
    // //     setValues(data.map(data => data.value))
    // // }, [])


    // return (
    //     <React.Fragment>
    //         <Plot divId='bookings-plot'
    //             data={[
    //                 {
    //                     x: values.map(data => data.month),
    //                     y: values.map(data => data.leads),
    //                     text: ['Sample', 'Sample', 'Sample', 'Sample', 'Sample', 'Sample'],
    //                     hovertemplate:
    //                         "<b>%{x}</b><br><br>" +
    //                         "%{yaxis.title.text}: %{y}<br>" +
    //                         "<extra>This is a test</extra>",
    //                     type: 'bar',
    //                     marker: {color: ['#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999']},
    //                     name: 'Line Chart',
    //                 }
    //             ]}
    //             onHover = {(data) => {
    //                 var pn='',
    //                     tn='',
    //                     colors=[];
    //                 pn = data.points[0].pointNumber;
    //                 tn = data.points[0].curveNumber;
    //                 colors = data.points[0].fullData.marker.color
    //                 colors[pn] = '#202950';
    //                 var update = {'marker':{color: colors, size:16}};
    //                 Plotly.restyle('bookings-plot', update, [tn]);
    //             }}
    //             onUnhover = {(data) => {
    //                 var pn='',
    //                     tn='',
    //                     colors=[];
    //                 for(var i=0; i < data.points.length; i++){
    //                     pn = data.points[i].pointNumber;
    //                     tn = data.points[i].curveNumber;
    //                     colors = data.points[i].fullData.marker.color;
    //                 };
    //                 colors[pn] = '#999999';

    //                 var update = {'marker':{color: colors, size:10}};
    //                 Plotly.restyle('bookings-plot', update, [tn]);
    //             }}
    //             layout = {{
    //                 title: 'Lead Toppers',
    //                 autosize: true,
    //                 xaxis: {
    //                 title: 'Toppers',
    //                 showgrid: false,
    //                 zeroline: false
    //                 },
    //                 yaxis: {
    //                 title: 'Leads',
    //                 showgrid: true
    //                 }
    //             }}
    //             config = {{
    //                 displaylogo: false,
    //                 modeBarButtonsToRemove: ['lasso2d', 'toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian', 'pan2d', 'resetScale2d', 'select2d', 'zoom2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d']
    //             }}
    //             useResizeHandler = {true}
    //             style = {{width: "100%", height: "100%"}}
    //         />
    //         <div>{monthlyData.map(d => d.id)}</div>
    //     </React.Fragment>
    // );
}

export default BookingsGraph