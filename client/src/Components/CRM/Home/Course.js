import React, { useEffect, useState } from 'react';
import createPlotlyComponent from 'react-plotly.js/factory';
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
const Plotly = window.Plotly;
const Plot = createPlotlyComponent(Plotly);

function CoursesGraph() {
    const toast = useToast()
    const [courses, setCourses] = useState([])
    const [totalCount, setTotalCount] = useState(0)
    const [names, setNames] = useState([])
    const [values, setValues] = useState([])

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_LEADS}/courseCount`, { email: JSON.parse(localStorage.getItem('user')).Email })
            .then(res => setCourses(res.data.courses))
            .catch(err => {
                toast({
                    description: "Error in fetching course list",
                    duration: 2000,
                    position: "top"
                })
            })
        axios.post(`${process.env.REACT_APP_LEADS}/totalCourseCount`, { email: JSON.parse(localStorage.getItem('user')).Email })
            .then(res => setTotalCount(res.data.total[0].count))
            .catch(err => {
                toast({
                    description: "Error in fetching courses",
                    duration: 2000,
                    position: "top"
                })
            })
    }, [])

    useEffect(() => {
        setNames(courses.map( source => source.Type))
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
                        name: 'Courses',
                        textinfo: 'label',
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