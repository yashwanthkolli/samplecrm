import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { useToast } from '@chakra-ui/react'; 
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import MaterialTable from 'material-table';

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
    },
    dialogTitle:{
        fontFamily: 'Nunito',
        fontSize: '18px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddLeads(){

    const classes = useStyles();
    const toast = useToast();

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [tableData, setTableData] = useState([]);

    const handleOpen = (id) => {
        switch (id) {
            case 1:
                setOpen(true);
                break;
            case 2:
                setOpen2(true);
                break;
            default:
                break;
        }
    }
    const handleClose = (id) => {
        switch (id) {
            case 1:
                setOpen(false);
                break;
            case 2:
                setOpen2(false);
                break;
            default:
                break;
        }
    }

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

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_LEADS}/getLatestLeads`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
            let data_latest = [];

            res.data.latest.map((element) => {
                data_latest.push({
                    "name": element.name
                })
            })
            setTableData(data_latest);
        })
        .catch((err) =>{})
    }, [])

    return(
        <>
        <Paper elevation={3} className={classes.containerLead}>
            <div className={classes.btnNewLead}>
                <Button style={{backgroundColor: '#202950', color: 'white', marginRight:'15px'}} variant="contained" onClick={() => handleOpen(2)}>
                    Search Leads
                </Button>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained" onClick={() => handleOpen(1)}>
                    Add New Lead
                </Button>
            </div>
            {
                tableData.length > 0 ?
                <MaterialTable

                />
                :
                <div className={classes.noData}>
                    No leads to show
                </div>
            }
        </Paper>
        <Dialog open={open} fullWidth TransitionComponent={Transition} onClose={() => handleClose(1)} aria-labelledby="add-new-lead">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Add New Lead</DialogTitle>
            <DialogContent></DialogContent>
        </Dialog>
        <Dialog open={open2} fullWidth TransitionComponent={Transition} onClose={() => handleClose(2)} aria-labelledby="add-new-lead">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Search Leads</DialogTitle>
            <DialogContent>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default AddLeads;

//pagination to handle the data into different pages so that load balancing can be done.