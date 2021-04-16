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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

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
        fontFamily: 'Nunito !important',
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
    },
    fieldHolder:{
        display: 'flex',
        justifyContent:'space-between',
        width: '100%',
        margin: '7px 0px 7px 0px'
    },
    selectField:{
        width: '45%'
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
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [qualif, setQualif] = useState("");
    const [source, setSource] = useState("");
    const [course, setCourse] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [status, setStatus] = useState("");

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

    const handleChange = (e, type) => {
        switch (type) {
            case 1:
                setQualif(e.target.value)
                break;
            case 2:
                setSource(e.target.value)
            default:
                break;
        }
        setQualif(e.target.value)
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

    const handleCancel = () => {
        handleClose(1);
        setEmailLead("");
        setName("");
        setCity("");
        setMobile("");
        setCollege("");
        setQualif("");
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
            <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>New Lead Details</DialogTitle>
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
                        style={{marginBottom: '7px'}}
                    />
                    <div className={classes.fieldHolder}>
                        <TextField 
                            autoComplete="off"
                            name="school"
                            type="text"
                            label="School/College"
                            placeholder="Enter School/College"
                            value={school}
                            onChange={e=>setCollege(e.target.value)}
                            style={{width: '45%'}}
                        />
                        <TextField 
                            required
                            autoComplete="off"
                            type="tel"
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            value={mobile}
                            onChange={e=>setMobile(e.target.value)}
                            style={{width: '45%'}}
                        />
                    </div>
                    <div className={classes.fieldHolder}>
                        <TextField 
                            required
                            autoComplete="off"
                            type="text"
                            label="City"
                            placeholder="Enter City Name"
                            value={city}
                            onChange={e=>setCity(e.target.value)}
                            style={{width: '45%'}}
                        />
                        <FormControl className={classes.selectField}>
                            <InputLabel>Qualification</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={qualif}
                                onChange={(e) => handleChange(e, 1)}
                            >
                                <MenuItem value={"not_available"}>Not Available</MenuItem>
                                <MenuItem value={"10"}>10th</MenuItem>
                                <MenuItem value={"12"}>12th</MenuItem>
                                <MenuItem value={"grad"}>Graduation</MenuItem>
                                <MenuItem value={"postGrad"}>Post-graduation</MenuItem>
                                <MenuItem value={"MBA"}>MBA</MenuItem>
                                <MenuItem value={"iti_others"}>ITI/Others</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.fieldHolder}>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Sources</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={source}
                                onChange={handleChange}
                            >
                                <MenuItem value={"not_available"}>Not Available</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Qualification</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={qualif}
                                onChange={handleChange}
                            >
                                <MenuItem value={"not_available"}>Not Available</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px'}} variant="contained">
                        Add New Lead
                    </Button>
                    <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px'}} variant="contained" onClick={handleCancel}>
                        Reset
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