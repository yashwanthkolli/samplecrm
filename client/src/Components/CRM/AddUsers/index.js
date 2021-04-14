import React, { useEffect, useState } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import { useToast } from '@chakra-ui/react';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {
    Section
} from './addUserComponents';
import { Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    useTable: {
        padding: theme.spacing(0)
    },
    userButton: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        color: 'white',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddUsers(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setFirstName("");
        setSurName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setAddress("");
        setCity("");
        setRole("");
        setReporting("");

        setOpen(false);
    };

    const toast = useToast();
    const [tableData, setTableData] = useState([]);

    const lid = "list-toast";

    const [firstname, setFirstName] = useState("");
    const [surname, setSurName] = useState("");
    const [email_new, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [role, setRole] = useState("");
    const [reporting, setReporting] = useState("");

    const adduser = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_USER}/addUser`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
        })
        .catch((err) => {
            
        })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/usersList`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
            let data = [];

            res.data.details.forEach((element) => {
                data.push({
                    "Name" : element.Firstname.trim() + " " + element.Surname.trim(),
                    "Email": element.Email,
                    "Mobile": element.Mobile,
                    "City": element.City,
                    "Type": element.Type,
                    "Reporting": element.Reporting === 'none' ? "None" : element.Reporting
                })
            })
            setTableData(data);
        })
        .catch((err) => {
            if(!toast.isActive(lid)){
                toast({
                    id: lid,
                    description: "Error in fetching users list",
                    duration: 2000,
                    position: "top"
                })
            }
        })
    }, [toast])

    return (
        <>
        <Paper elevation={3} style={{width: "100%", height: "max-content"}} className={classes.userTable}>
            {
                tableData.length > 0 ?
                    <MaterialTable
                        columns={[
                            {title: 'Name', field: 'Name'},
                            {title: 'Email', field: 'Email'},
                            {title: 'Mobile', field: 'Mobile'},
                            {title: 'City', field: 'City'},
                            {title: 'Role', field: 'Type'},
                            {title: 'Reporting To', field: 'Reporting'}
                        ]}
                        data={tableData}
                        title="CRM User List"
                    />
                :
                    <Section>
                        No users in the database.
                    </Section>
            }
            <div className={classes.userButton}>
                <Button style={{backgroundColor: "#202950", color: 'white', padding: '7px 10px'}} onClick={handleClickOpen}>Add New User</Button>
            </div>
        </Paper>
        <Dialog open={open} fullWidth TransitionComponent={Transition} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New CRM User</DialogTitle>
            <DialogContent>
                <form onSubmit={adduser}>
                    <div className={classes.name}>
                        <TextField 
                            required
                            autoComplete="off"
                            label="First Name"
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={e=>setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            autoComplete="off"
                            type="text"
                            label="Sur Name"
                            name="surname"
                            value={surname}
                            onChange={e=>setSurName(e.target.value)}
                        />
                    </div>
                    <TextField 
                        required
                        fullWidth
                        autoComplete="off"
                        label="Email"
                        type="email"
                        name="email"
                        value={email_new}
                        style={{marginBottom: '10px'}}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <TextField 
                        required
                        fullWidth
                        autoComplete="off"
                        label="Password"
                        name="Password"
                        value={password}
                        type="password"
                        style={{marginBottom: '10px'}}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <div className={classes.name}>
                        <TextField 
                            required
                            autoComplete="off"
                            type="text"
                            name="address"
                            label="Address"
                            value={address}
                            onChange={e=>setAddress(e.target.value)}
                        />
                        <TextField 
                            required
                            autoComplete="off"
                            type="text"
                            name="city"
                            label="City"
                            value={city}
                            onChange={e=>setCity(e.target.value)}
                        />
                    </div>
                    <Select
                        
                    />
                    <DialogActions>
                        <Button onClick={handleClose} style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                            Cancel
                        </Button>
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                            Add User
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default AddUsers;