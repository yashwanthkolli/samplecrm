import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function CoursesGraph() {
    const userData = decodeSessionStorage().payload;

    const [courses, setCourses] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_LEADS}/courseCount`, { email: userData.Email })
            .then(res => {
                setCourses(res.data.courses)
            })
            .catch(err => {})
        axios.post(`${process.env.REACT_APP_LEADS}/totalCourseCount`, { email: userData.Email })
            .then(res => {
                setTotalCount(res.data.total[0].count)
            })
            .catch(err => {})
    }, [userData.Email])

    useEffect(() => {
        setNames(courses.map( source => source.Name))
        setValues(courses.map( source => source.count))
    }, [courses])

    return (
        <React.Fragment>
            <Plot divId='course-plot'
                data={[
                    {
                        labels: names.concat(['Others']),
                        values: values.concat([totalCount - values.reduce((a,b) => a+b, 0)]),
                        hoverinfo: 'label+percent+value',
                        type: 'pie',
                        marker: {colors: ['#384b7e', '#122425', '#223565', '#243739', '#060404', '#202950', '#065499']},
                        text: names.concat(['Others']).map(name => name.substring(0, 6)+'...'),
                        name: 'Courses',
                        textinfo: 'text',
                        textposition: 'inside',
                        insidetextorientation: 'radial'
                    }
                ]}
                layout = {{
                    title: 'Courses',
                    showlegend: false,
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

export default CoursesGraph