import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Circle, useToast } from '@chakra-ui/react';
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
        height: '100%'
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
                    <Button color="primary" variant="contained" style={{ backgroundColor: '#202950'}}>Upload Picture</Button>
                    <Button color="primary" variant="contained" style={{marginRight: "auto", marginLeft: "10px", backgroundColor: '#202950'}}>Update Password</Button>
                </ButtonContainer>              
            </Paper>
        </div>
    )
}

export default Profile;