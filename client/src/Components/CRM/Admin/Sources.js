import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles'; 
import MaterialTable from 'material-table'
import axios from 'axios'
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
} from "@chakra-ui/react"

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

function Sources() {


    const classes = useStyles();
    const toast = useToast();
    const source_toast = "source";

    const [update, setUpdate] = useState(false);

    const [sources, setSources] = useState([])
    const [open, setOpen] = useState(false)
    const [source, setSource] = useState('')
    const [popup, setPopup] = useState(false)
    const [deleteSourceId, setDeleteSourceId] = useState()

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getSource`, { email: JSON.parse(localStorage.getItem('user')).Email })
        .then(res => setSources(res.data.sources))
        .catch(err => {})
    }, [update])

    const onDeleteSource = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteSource`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            id: id
        })
        .then(res => {
            if(!toast.isActive(source_toast)){
                toast({
                    id: source_toast,
                    description: "Deleted Successfully",
                    duration: 3000,
                    position: "top"
                }) 
            }
            setUpdate(!update);
        })
        .catch(err => {
            if(!toast.isActive(source_toast)){
                toast({
                    id: source_toast,
                    description: "Deleting Sources Failed",
                    duration: 3000,
                    position: "top"
                }) 
            }
        })
    }

    const onAddSource = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_CONFIG}/addSource`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            source
        })
        .then(res => {
            setOpen(false)
            setSource('')
            setUpdate(!update);
            if(!toast.isActive(source_toast)){
                toast({
                    id: source_toast,
                    description: "Added Successfully",
                    duration: 3000,
                    position: "top"
                }) 
            }
        })
        .catch(err => {
            if(!toast.isActive(source_toast)){
                toast({
                    id: source_toast,
                    description: "Adding Sources Failed",
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
                title="Sources"
                columns={[
                    { title: 'Source', field: 'name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    {
                        title: 'Delete',
                        field: 'internal_action',
                        cellStyle: {textAlign: 'center'},
                        sorting: false,
                        headerStyle: {textAlign: 'center'},
                        render: (rowData) =>
                            rowData && (
                            <button
                                color="secondary"
                                onClick={() => {
                                    setPopup(true)
                                    setDeleteSourceId(rowData.id)
                                }}
                            >
                                <Icon component={AiFillDelete} />
                            </button>
                            )
                    }
                ]}
                data={ sources }
                options={{
                    headerStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                style={{width: '95%'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                Add Source
            </Button>
        </Paper>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Add Sources</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddSource(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="source"
                            type="text"
                            value={source}
                            onChange={e=>setSource(e.target.value)}
                            label="Source"
                            placeholder="Enter source"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Add Source
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
                <AlertDialogHeader>Delete Source?</AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure you want to delete the source?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => setPopup(false)}>
                    No
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={() => {
                        onDeleteSource(deleteSourceId)
                        setPopup(false)
                    }}
                    >
                    Yes
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default Sources