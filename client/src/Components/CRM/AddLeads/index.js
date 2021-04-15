import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { useToast } from '@chakra-ui/react'; 
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    containerLead: {
        display: 'flex',
        width: '100%',
        alignSelf: 'center',
        justifySelf: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    btnNewLead:{
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-end'
    }
}))

function AddLeads(){

    const classes = useStyles();
    const toast = useToast();

    const [tableData, setTableData] = useState([]);

    const turnToPage = (pageId) => {

        axios.post(`${process.env.REACT_APP_LEADS}/getLeads`, {
            email: JSON.parse(localStorage.getItem('user')).Email
        },{
            params: {
                page: pageId
            }
        })
        .then((res) => {
            res.data.content.forEach((element) => {
            })
        })
        .catch(err => {
            toast({
                description: "Error In Fetching Leads",
                duration: 2000,
                position: "top"
            })
        })
    }

    return(
        <Paper elevation={3} className={classes.containerLead}>
            <div className={classes.btnNewLead}>
                <Button style={{backgroundColor: '#202950', color: 'white', marginRight:'15px'}} variant="contained">
                    Search Leads
                </Button>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Add New Lead
                </Button>
            </div>
        </Paper>
    )
}

export default AddLeads;

//pagination to handle the data into different pages so that load balancing can be done.