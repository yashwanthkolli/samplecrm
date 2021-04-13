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
    Summary, 
    TextWrapper,
    Title,
    Value
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

    const fullName = JSON.parse(localStorage.getItem('user')).Firstname.trim() + " " + JSON.parse(localStorage.getItem('user')).Surname.trim()

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/detailsUser`,{
            email: JSON.parse(localStorage.getItem('user')).Email
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
    },[profile, toast])

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
                        </Summary>
                    </TextContainer>                    
                </Paper>
            </Holder>
        </div>
    )
}

export default Profile;