import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Avatar } from '@chakra-ui/react';
import {
    Holder,
    ButtonContainer,
    ImageHolder
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
    imageHolder: {
        display: 'grid',
        placeItems: 'center',
        padding: "25px"
    }
}))

function Profile(){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Holder>
                <Paper className={classes.container} style={{padding: "20px"}} elevation={3}>
                    <div className={classes.imageHolder} >
                        <Avatar style={{width: "100%",height:"100%"}}>
                            <ImageHolder src={ice} alt={JSON.parse(localStorage.getItem('user')).Firstname} />
                        </Avatar>  
                    </div>
                    <ButtonContainer>
                        <Button fullWidth color="primary" variant="contained" style={{marginBottom: "10px"}}>Upload Picture</Button>
                        <Button fullWidth color="primary" variant="contained">Update Password</Button>
                    </ButtonContainer>
                </Paper>
                <Paper className={classes.container} elevation={3}>

                </Paper>
            </Holder>
        </div>
    )
}

export default Profile;