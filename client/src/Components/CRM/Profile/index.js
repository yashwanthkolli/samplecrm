import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
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
    avatar: {
        width: '100%',
        height: '100%',
    }
}))

function Profile(){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Holder>
                <Paper className={classes.container} elevation={3}>
                    <Avatar className={classes.avatar} src={ice} alt={JSON.parse(localStorage.getItem('user')).Firstname}/>
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