import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Square, useToast } from '@chakra-ui/react';
import axios from 'axios';
import {
    Holder,
    ButtonContainer,
    ImageHolder,
    TextContainer,
    Heading,
    Summary
} from './ProfileComponents';

const ice = require('../../../images/001.png').default;

const useStyles = makeStyles((theme) => ({
    root:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    container: {
        padding: theme.spacing(2),
        minHeight: '80vh',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridGap: '20px'
    },
    textcontainer: {
        padding: theme.spacing(2),
        minHeight: '80vh',
        width: '100%'
    },
    imageHolder: {
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '100%'
    }
}))

function Profile(){

    const classes = useStyles();
    const toast = useToast();

    const [profile, setProfile] = useState([]); 

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/detailsUser`,{
            email: JSON.parse(localStorage.getItem('user')).email
        })
        .then((res) => {
            setProfile(res.data.details)
        })
        .catch((err) => {
            toast({
                description: "Error in fetching profile details",
                duration: 3000,
                position: "top"
            })
        })
    })

    return (
        <div className={classes.root}>
            <Holder>
                <Paper className={classes.container} style={{padding: "20px"}} elevation={3}>
                    <div className={classes.imageHolder} >
                        <Square size="200px" style={{border: "1px solid blue", overflow: 'hidden'}}>
                            <ImageHolder src={ice} alt={JSON.parse(localStorage.getItem('user')).Firstname} />
                        </Square>  
                    </div>
                    <ButtonContainer>
                        <Button fullWidth color="primary" variant="contained" style={{marginBottom: "10px"}}>Upload Picture</Button>
                        <Button fullWidth color="primary" variant="contained">Update Password</Button>
                    </ButtonContainer>
                </Paper>
                <Paper className={classes.textcontainer} elevation={3}>
                    <TextContainer>
                        <Heading>
                            Basic Information - Profile
                        </Heading>
                        <Summary>
                            {profile.forEach((element) => {
                                return(
                                    <>
                                        <h6>`${element[0]}`</h6>
                                    </>
                                )
                            })}
                        </Summary>
                    </TextContainer>                    
                </Paper>
            </Holder>
        </div>
    )
}

export default Profile;