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
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

const useStyles = makeStyles((theme) => ({
    containerLead: {
        display: 'flex',
        width: '100%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        flexDirection:'column'
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
    },
    tableHolder:{
        display: 'grid',
        placeItems: 'center',
        width:'100%',
        height: '95%'
    },
    noData:{
        fontFamily: 'Nunito',
        fontSize: '25px'
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
    const [update, setUpdate] = useState(false);

    const [name, setName] = useState("");
    const [email_lead, setEmailLead] = useState("");
    const [school, setCollege] = useState("");
    const [qualif, setQualif] = useState("");

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

    const handleNewLead = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_LEADS}/addNewLeads`, {
            email: JSON.parse(localStorage.getItem('user')).Email,

        })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_LEADS}/getLatestLeads`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
            let data_latest = [];

            res.data.latest.forEach((element) => {
                data_latest.push({
                    "name": element.name
                })
            })
            setTableData(data_latest);
        })
        .catch((err) =>{})
    }, [update])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_LEADS}/getConfigurations`, {
            email: JSON.parse(localStorage.getItem('user')).Email
        })
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
            <div className={classes.tableHolder}>
            {
                tableData.length > 0 ?
                <MaterialTable

                />
                :
                <div className={classes.noData}>
                    No leads to show
                </div>
            }
            </div>
        </Paper>
        <Dialog open={open} fullWidth TransitionComponent={Transition} onClose={() => handleClose(1)} aria-labelledby="add-new-lead">
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Fill all the required details to create a new lead</DialogTitle>
            <DialogContent>
                <form onSubmit={handleNewLead}>
                    <TextField 
                        required
                        fullWidth
                        autoComplete="off"
                        name="name"
                        type="text"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        label="Name"
                        placeholder="Enter Lead's Name"
                        style={{marginBottom: '7px'}}
                    />
                    <TextField 
                        required
                        fullWidth
                        autoComplete="off"
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter Lead's Email"
                        value={email_lead}
                        onChange={e=>setEmailLead(e.target.value)}
                    />
                    <TextField 
                        autoComplete="off"
                        name="school"
                        type="text"
                        label="School/College"
                        placeholder="Enter School/College"
                        value={school}
                        onChange={e=>setCollege(e.target.value)}
                    />
                    <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginTop:'10px'}} variant="contained">
                        Add New Lead
                    </Button>
                </form>
            </DialogContent>
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