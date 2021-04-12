import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
    Holder,
    ButtonContainer,
    ImageHolder
} from './ProfileComponents';

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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    },
    avatar: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    }
}))

function Profile(){

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Holder>
                <Paper className={classes.container} elevation={3}>
                    <ImageHolder />
                    <ButtonContainer>
                        <Button fullWidth color="primary" variant="contained">Upload Picture</Button>
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