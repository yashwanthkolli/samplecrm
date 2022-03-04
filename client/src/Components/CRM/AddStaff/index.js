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
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import Loading from '../../Loading';

const useStyles = makeStyles((theme) => ({
    userTable: {
        padding: theme.spacing(0),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '5px'
       
    }
}));

function AddStaff() {
    const userData = decodeSessionStorage().payload;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const toast = useToast();
    const [rawData, setRawData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email_new, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [sid,setSid]= useState("");
    const [oname, setOname] = useState("");

    const [openLoading, setOpenLoading] = useState(false);
    const [typeLoading, setTypeLoading] = useState("");

    const handleClose = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setSid("");
        setRole("");
        setOname("");

        setOpen(false);
    };

    const adduser = (e) => {
        e.preventDefault();

        setOpenLoading(true);
        setTypeLoading("userAdding");
       
        axios.post(`${process.env.REACT_APP_USER}/addStaffUser`,{
            email: userData.email,
            first: firstname,
            last: lastname,
            new_email: email_new,
            pswd: password,
            mobile: mobile,
            role: "Staff",
            scd: userData.scd,
            sid: sid,
            oname : userData.oname

        })
        .then((res) => {
            setOpenLoading(false);
            setTypeLoading("");

            
            toast({
                description: "Added User Successfully",
                duration: 3000,
                position: "top"
            })
            
        })
        .catch((err) => {
            console.log(err);
            toast({
                description: "Failed To Add User",
                duration: 3000,
                position: "top"
            })
            
        })
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setSid("");
        setRole("");
        setOname("");

        setOpen(false);
    }

  return (
    <Paper elevation={3} style={{width: "60%", height: 'max-content', padding: '30px 30px 30px 30px'}} className={classes.userTable}>
    <form onSubmit={adduser}>
                     <div className={classes.name}>
                         <TextField 
                            required
                            autoComplete="off"
                            label="First Name"
                            type="text"
                            name="firstname"
                            value={firstname}
                            style={{marginRight: '40px',marginBottom: '20px'}}
                            
                            onChange={e=>setFirstName(e.target.value)}
                        />
                        <TextField
                            required
                            autoComplete="off"
                            type="text"
                            label="Last Name"
                            name="lastname"
                            value={lastname}
                            style={{marginRight: '40px',marginBottom: '20px'}}
                            onChange={e=>setLastName(e.target.value)}
                        />
                    </div>
                    <TextField 
                        required
                        halfWidth
                        autoComplete="off"
                        label="Email"
                        type="email"
                        name="email"
                        value={email_new}
                        style={{marginRight: '40px',marginBottom: '20px'}}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <TextField 
                        required
                        halfWidth
                        autoComplete="off"
                        label="Password"
                        name="Password"
                        value={password}
                        type="password"
                        style={{marginRight: '40px',marginBottom: '20px'}}
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
                            style={{marginRight: '40px',marginBottom: '20px'}}
                            onChange={e=>setMobile(e.target.value)}
                        />
                        <div style={{width: '50%'}}>
                            <InputLabel>Staff ID</InputLabel>
                            <TextField 
                                halfWidth
                                required
                                value={sid}
                                type="text"
                                name="sid"
                                autoComplete="off"
                                style={{marginRight: '40px',marginBottom: '20px'}}
                                onChange={e=>setSid(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <DialogActions>
                        <Button onClick={handleClose} style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                            Cancel
                        </Button>
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                            Add User
                        </Button>
                    </DialogActions>
                </form>
    
    </Paper>
  )
}

export default AddStaff;

