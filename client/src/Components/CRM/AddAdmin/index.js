import React, {  useState } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import { useToast } from '@chakra-ui/react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/Inputlabel';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

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

function AddAdmin() {
    const userData = decodeSessionStorage().payload;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const toast = useToast();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    
    const [newsid,setNewsid] = useState("");

    const [openLoading, setOpenLoading] = useState(false);
    const [typeLoading, setTypeLoading] = useState("");

    const handleClose = () => {
        setFirstName("");
        setLastName("");
        setPassword("");
        setRole("");
        setNewsid("");
        setOpen(false);
    };

    const adduser = (e) => {
        e.preventDefault();

        setOpenLoading(true);
        setTypeLoading("userAdding");

        axios.post(`${process.env.REACT_APP_USER}/addAdminUser`,{
            
            first: firstname,
            last: lastname,
            pswd: password,
            role: "Admin",
            scd: userData.scd,
            sid: userData.sid,
            oname : '',
            newsid:newsid

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
            
            toast({
                description: "Failed To Add User",
                duration: 3000,
                position: "top"
            })
            
        })
        setFirstName("");
        setLastName("");
        setPassword("");
        setRole("");
        setNewsid("");
        setOpen(false);
    }

  return (
    <Paper  elevation={3} style={{width: "60%", height: 'max-content', padding: '30px 30px 30px 30px'}} className={classes.userTable}>
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
                label="Password"
                name="Password"
                value={password}
                type="password"
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e=>setPassword(e.target.value)}
            />
            <div className={classes.name}>
                <div style={{width: '50%'}}>
                    <InputLabel>Staff ID</InputLabel>
                    <TextField 
                        halfWidth
                        required
                        value={newsid}
                        type="text"
                        name="sid"
                        autoComplete="off"
                        style={{marginRight: '40px',marginBottom: '20px'}}
                        onChange={e=>setNewsid(e.target.value)}
                    />
                </div>
            </div>
            
            
            <DialogActions>
                <Button onClick={handleClose} style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add Admin
                </Button>
            </DialogActions>
        </form>
    </Paper>
  )
}

export default AddAdmin;

