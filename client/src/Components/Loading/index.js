import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    progressCircle: {
        display: 'grid',
        placeItems: 'center',
        width: '100%',
        height: '35vh',
        fontSize: '25px',
        fontFamily: 'Nunito'
    }
}))

function Loading(props){
    const classes = useStyles();

    return (
        <Dialog open={props.open} fullWidth disableBackdropClick disableEscapeKeyDown 
        TransitionComponent={Transition}
        onClose={() => props.setOpenLoading(false)} aria-labelledby="loading search results"
        >
            <DialogContent className={classes.progressCircle}>
                Loading {props.type === "search" ? "Search Results" : props.type === "latestLeads" ? "Latest Leads" : props.type === "userLoading" ? "users and configurations" : props.type === "userAdding" ? "Adding User" : null} <CircularProgress />
            </DialogContent>
        </Dialog>
    ) 
}

export default Loading;