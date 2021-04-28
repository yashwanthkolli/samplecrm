import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AiFillDelete } from 'react-icons/ai';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast
} from "@chakra-ui/react";
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

const useStyles = makeStyles((theme) => ({
    containerLead: {
        display: 'flex',
        width: '100%',
        height: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        flexDirection:'column'
    }
}))

function Ads() {
    const userData = decodeSessionStorage().payload;

    const classes = useStyles();
    const toast = useToast();
    const toast_id = "ads_id";

    const [ads, setAds] = useState([])
    const [open, setOpen] = useState(false)
    const [popup, setPopup] = useState(false)
    const [ad_name, setAdName] = useState('');
    const [medium, setMedium] = useState('');
    const [place, setPlace] = useState('');
    const [deleteAdId, setDeleteAdId] = useState()

    const [update, setUpdate] = useState(false);

    useEffect( () => {

        axios.post(`${process.env.REACT_APP_CONFIG}/getAds`,
        { 
            email: userData.Email
        })
        .then(res => setAds(res.data.adnames))
        .catch(err => {})
    }, [update])
  
    const onDeleteAd = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteAds`, {
            email: userData.Email,
            id: id
        })
        .then(res => {

            setUpdate(!update);
            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Deleted Ad Successfully",
                    duration: 3000,
                    position: "top"
                })
            }
        })
        .catch(err => {
            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Deleting Ad Failed",
                    duration: 3000,
                    position: "top"
                })
            }
        })
    }

    const onAddAd = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_CONFIG}/addAds`, {
            email: userData.Email,
            ad_name, medium, place
        })
        .then(res => {
            setUpdate(!update);
            setOpen(false);
            setPlace('');
            setMedium('');
            setAdName('');

            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Added Comment Successfully",
                    duration: 3000,
                    position: "top"
                })
            }
        })
        .catch(err => {
            if(!toast.isActive(toast_id)){
                toast({
                    id: toast_id,
                    description: "Failed To Add Comment",
                    duration: 3000,
                    position: "top"
                })
            }
        })
    }

    return (
        <>
        <Paper elevation={3} className={classes.containerLead}>
            <MaterialTable
                title="Current Active Ads"
                columns={[
                    { title: 'Name', field: 'ad_name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Medium', field: 'medium', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Place', field: 'place', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    {
                        title: 'Delete',
                        field: 'internal_action',
                        cellStyle: {textAlign: 'center'},
                        headerStyle: {textAlign: 'center'},
                        sorting: false,
                        render: (rowData) =>
                            rowData && (
                            <button
                                color="secondary"
                                onClick={() => {
                                    setPopup(true)
                                    setDeleteAdId(rowData.id)
                                }}
                            >
                                <Icon component={AiFillDelete} />
                            </button>
                            )
                    }
                ]}
                data={ ads }
                options={{
                    headerStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                style={{width: '95%'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                Create New Ad
            </Button>
            </Paper>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Create a new Ad</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddAd(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="ad_name"
                            type="text"
                            value={ad_name}
                            onChange={e=>setAdName(e.target.value)}
                            label="Ad Name"
                            placeholder="Enter Ad Name"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="medium"
                            type="text"
                            value={medium}
                            onChange={e=>setMedium(e.target.value)}
                            label="Ad Medium"
                            placeholder="Enter Ad Medium"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="place"
                            type="text"
                            value={place}
                            onChange={e=>setPlace(e.target.value)}
                            label="Place"
                            placeholder="Enter place of activity"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Create
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <AlertDialog
                motionPreset="slideInTop"
                onClose={ () => setPopup(false) }
                isOpen={popup}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                <AlertDialogHeader>Delete Ad?</AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure you want to delete the ad?.
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => setPopup(false)}>
                    No
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={() => {
                        onDeleteAd(deleteAdId)
                        setPopup(false)}}
                    >
                    Yes
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Ads