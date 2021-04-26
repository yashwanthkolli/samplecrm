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
import InputLabel from '@material-ui/core/Inputlabel';
import axios from 'axios';
import {
    Section
} from './addUserComponents';

const useStyles = makeStyles((theme) => ({
    useTable: {
        padding: theme.spacing(0)
    },
    userButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
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
        marginBottom: '5px'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddUsers(){

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);

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

    const handleChangeRole = (e) => {
        setRole(e.target.value);
    }
    const handleChangeReporting = (e) => {
        setReporting(e.target.value);
    }

    const toast = useToast();
    const [tableData, setTableData] = useState([]);

    const lid = "list-toast";
    const uid = "uid-toast";

    const [rawData, setRawData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [firstname, setFirstName] = useState("");
    const [surname, setSurName] = useState("");
    const [email_new, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [role, setRole] = useState("");
    const [reporting, setReporting] = useState("");

    const adduser = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_USER}/addUser`,{
            email: JSON.parse(sessionStorage.getItem('user')).Email,
            first: firstname,
            sur: surname,
            new_email: email_new,
            pswd: password,
            mobile: mobile,
            dob: dob,
            address: address,
            city: city,
            role: role,
            reporting: reporting
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
            if(!toast.isActive(uid)){
                toast({
                    id: uid,
                    description: "Added User Successfully",
                    duration: 3000,
                    position: "top"
                })
            }
        })
        .catch((err) => {
            if(!toast.isActive(uid)){
                toast({
                    id: uid,
                    description: "Failed To Add User",
                    duration: 3000,
                    position: "top"
                })
            }
        })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/getCityNames`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email
        })
        .then((res) => {
            setCityData(res.data.city);
        })
        .catch(err => {
            if(!toast.isActive(lid)){
                toast({
                    id: lid,
                    description: "Error in fetching city names",
                    duration: 2000, 
                    position: "top-right"
                })
            }
        })
    })

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/usersList`,{
            email: JSON.parse(sessionStorage.getItem('user')).Email
        })
        .then((res) => {
            setRawData(res.data.details);
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
                    position: "top-right"
                })
            }
        })
    }, [toast, update])

    return (
        <>
            <Paper elevation={3} style={{width: "100%", height: 'max-content', padding: '10px 10px 0px 10px'}} className={classes.userTable}>
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
                        style={{marginBottom: '5px'}}
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
                        style={{marginBottom: '5px'}}
                        onChange={e=>setPassword(e.target.value)}
                    />
                    <div className={classes.name}>
                        <TextField 
                            required
                            value={mobile}
                            type="tel"
                            name="mobile"
                            autoComplete="off"
                            label="Mobile Number"
                            style={{marginBottom: '5px'}}
                            onChange={e=>setMobile(e.target.value)}
                        />
                        <div>
                            <InputLabel>Date of birth</InputLabel>
                            <TextField 
                                required
                                value={dob}
                                type="date"
                                name="dob"
                                autoComplete="off"
                                style={{marginBottom: '5px'}}
                                onChange={e=>setDob(e.target.value)}
                            />
                        </div>
                    </div>
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
                        <div className={classes.select}>
                            <InputLabel>Select City</InputLabel>
                            <Select
                                required
                                fullWidth
                                label="Select City"
                                value={city}
                                onChange={handleChangeCity}
                            >
                                {cityData.map((element, index) => {
                                    return (
                                        <MenuItem key={index} value={element.city} />
                                    )
                                })}
                            </Select>
                        </div>
                    </div>
                    <div className={classes.select}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            required
                            fullWidth
                            label="Role of user"
                            style={{marginBottom: '5px'}}
                            value={role}
                            onChange={handleChangeRole}
                        >
                            <option value="Admin">Admin</option>
                            <option value="national_head">National Head</option>
                            <option value="IT Administator">IT Administator</option>
                            <option value="Manager">Manager</option>
                            <option value="TeleCaller">TeleCaller</option>
                            <option value="Convertor">Convertor</option>
                        </Select>
                    </div>
                    <div className={classes.select}>
                        <InputLabel>Reporting To</InputLabel>
                        <Select 
                            required
                            fullWidth
                            style={{marginBottom: '5px'}}
                            value={reporting}
                            onChange={handleChangeReporting}
                        >
                            {rawData.map((element) => {
                                return (
                                    <option key={element.Firstname} value={element.Firstname.trim() + " " + element.Surname.trim()}>
                                        {element.Firstname.trim() + " " + element.Surname.trim()}
                                    </option>
                                )
                            })}
                        </Select>
                    </div>
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