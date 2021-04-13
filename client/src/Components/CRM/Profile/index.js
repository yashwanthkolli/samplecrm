import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Circle, useToast } from '@chakra-ui/react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {
    Holder,
    ButtonContainer,
    ImageHolder,
    TextContainer,
    Heading,
    TextWrapper,
    Title,
    Value
} from './ProfileComponents';

const ice = require('../../../images/ak.jpg').default;

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    },
    container: {
        padding: theme.spacing(2),
        minHeight: '80vh',
        width: '100%'
    },
    textcontainer: {
        padding: theme.spacing(2),
        minHeight: '80vh',
        width: '100%'
    },
    imageHolder: {
        display: 'grid',
        placeItems: 'center',
    }
}))

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Profile(){

    const classes = useStyles();
    const toast = useToast();

    const pid = "pass-toast";
    const qid = "length-toast";

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    }
    const handleClose = () => {
        setCPassword("");
        setNPassword("");
        setRPassword("");
        setOpen(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
    }

    const [profile, setProfile] = useState([]); 
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [cPassword, setCPassword] = useState("");
    const [nPassword, setNPassword] = useState("");
    const [rPassword, setRPassword] = useState("");

    const fullName = JSON.parse(localStorage.getItem('user')).Firstname.trim() + " " + JSON.parse(localStorage.getItem('user')).Surname.trim();

    const handleUpdatePassword = (e) => {
        e.preventDefault();

        if(nPassword.length > 8){
            if(nPassword === rPassword){
                axios.post(`${process.env.REACT_APP_USER}/changePassword`, {
                    email: JSON.parse(localStorage.getItem('user')).Email,
                    current: cPassword,
                    newP: nPassword
                })
                .then((res) => {
                    setCPassword("");
                    setNPassword("");
                    setRPassword("");
                    handleClose();
                    toast({
                        description: "Password Updated Successfully!",
                        duration: 2000,
                        position: "top"
                    })
                })
                .catch((err) => {
                    toast({
                        description: "Password Update Failed!",
                        duration: 2000,
                        position: "top"
                    })
                })
            } else {
                if(!toast.isActive(pid)){
                    toast({
                        id: pid,
                        description: "New and current password don't match",
                        duration: 2000,
                        position: "top"
                    })
                }
            }
        } else {
            if(!toast.isActive(qid)){
                toast({
                    id: qid,
                    description: "Password should be of more than 8 characters",
                    position: "top",
                    duration: 2000
                })
            }
        }
    }

    const handleUpload = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_USER}/uploadPicture`,{
            
        })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/detailsUser`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
            setProfile(res.data.details)
        })
        .catch((err) => {
        })
    },[profile, toast])

    return (
        <>
        <div className={classes.root}>
            <Paper className={classes.container} elevation={3}>
                <Heading>
                    Basic Information - Profile
                </Heading>
                <Holder>
                    <div className={classes.imageHolder} >
                        <Circle size="250px" style={{border: "1px solid blue", overflow: 'hidden'}}>
                            <ImageHolder src={ice} alt={JSON.parse(localStorage.getItem('user')).Firstname} />
                        </Circle>  
                    </div>
                    <TextContainer>
                        <TextWrapper>
                            <Title>Full Name</Title>
                            <Value>{fullName}</Value>
                        </TextWrapper>
                        <TextWrapper>
                            <Title>Email</Title>
                            <Value>{JSON.parse(localStorage.getItem('user')).Email}</Value>
                        </TextWrapper>
                        <TextWrapper>
                            <Title>Mobile</Title>
                            <Value>{JSON.parse(localStorage.getItem('user')).Mobile}</Value>
                        </TextWrapper>
                        {profile.map((element) => {
                            return(
                                <TextWrapper key={`${element[0]}`}>
                                    <Title>{`${element[0]}`}</Title>
                                    <Value>{`${element[1]}`}</Value>
                                </TextWrapper>
                            )
                        })}
                    </TextContainer>     
                </Holder> 
                <ButtonContainer>
                    <Button color="primary" variant="contained" style={{ backgroundColor: '#202950'}} onClick={handleClickOpen2}>Upload Picture</Button>
                    <Button color="primary" variant="contained" style={{marginRight: "auto", marginLeft: "10px", backgroundColor: '#202950'}} onClick={handleClickOpen}>Update Password</Button>
                </ButtonContainer>              
            </Paper>
        </div>
        <Dialog open={open} fullWidth TransitionComponent={Transition} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Password</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter the current password of your account and then set the new password.
            </DialogContentText>
            <form onSubmit={handleUpdatePassword}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="current_password"
                    label="Current Password"
                    type="password"
                    fullWidth
                    value={cPassword}
                    onChange={e => setCPassword(e.target.value)}
                    required
                />
                <TextField
                    margin="dense"
                    id="new_password"
                    label="New Password"
                    type="password"
                    fullWidth
                    value={nPassword}
                    onChange={e => setNPassword(e.target.value)}
                    required
                />
                <TextField
                    margin="dense"
                    id="reset_password"
                    label="Reset Password"
                    type="password"
                    fullWidth
                    value={rPassword}
                    onChange={e => setRPassword(e.target.value)}
                    required
                />
                <DialogActions>
                    <Button onClick={handleClose} style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                        Cancel
                    </Button>
                    <Button type="submit" style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </form>
            </DialogContent>
        </Dialog>
        <Dialog open={open2} fullWidth TransitionComponent={Transition} onClose={handleClose2} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Upload Password</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Select a file that must be of jpg/png format and must not be more than 2MB.
            </DialogContentText>
            <form onSubmit={handleUpload}>
                <TextField
                    autoFocus
                    margin="dense"
                    id="display"
                    label="Select A Photo"
                    type="file"
                    fullWidth
                    required
                />
                <DialogActions>
                    <Button onClick={handleClose2} style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                        Cancel
                    </Button>
                    <Button type="submit" style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                        Upload
                    </Button>
                </DialogActions>
            </form>
            </DialogContent>
        </Dialog>
        </>
    )
}

export default Profile;