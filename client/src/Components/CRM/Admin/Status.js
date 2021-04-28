import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { useToast } from '@chakra-ui/react'; 
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
    AlertDialogOverlay
} from "@chakra-ui/react"
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

function Status() {
    const toast = useToast();
    const userData = decodeSessionStorage().payload;
    
    const [statusArray, setStatusArray] = useState([])
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState('')
    const [popup, setPopup] = useState(false)
    const [deleteStatusId, setDeleteStatusId] = useState()

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getStatus`, { email: userData.Email })
        .then(res => setStatusArray(res.data.status))
        .catch(err => {
            toast({
                description: "Error In Fetching Status",
                duration: 2000,
                position: "top"
            })
        })
    }, [toast])

    const onDeleteStatus = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteStatus`, {
            email: userData.Email,
            id: id
        })
        .then(res => {
            toast({
                description: "Status Deleted",
                duration: 2000,
                position: "top"
            })
            axios.post(`${process.env.REACT_APP_CONFIG}/getStatus`, { email: userData.Email })
            .then(res => setStatusArray(res.data.status))
            .catch(err => {
                toast({
                    description: "Error In Fetching Status",
                    duration: 2000,
                    position: "top"
                })
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Status",
                duration: 2000,
                position: "top"
            })
        })
    }

    const onAddStatus = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addStatus`, {
            email: userData.Email,
            status
        })
        .then(res => {
            toast({
                description: "Status Added",
                duration: 2000,
                position: "top"
            })
            setOpen(false)
            setStatus('')
            axios.post(`${process.env.REACT_APP_CONFIG}/getStatus`, { email: userData.Email })
            .then(res => setStatusArray(res.data.status))
            .catch(err => {
                toast({
                    description: "Error In Fetching Status",
                    duration: 2000,
                    position: "top"
                })
            })
        })
        .catch(err => {
            toast({
                description: "Error In Adding Status",
                duration: 2000,
                position: "top"
            })
        })
    }

    return (
        <div style={{width: '90%'}}>
            <MaterialTable
                title="Status"
                columns={[
                    { title: 'Id', field: 'id', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Status', field: 'name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
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
                                    setDeleteStatusId(rowData.id)
                                }}
                            >
                                <Icon component={AiFillDelete} />
                            </button>
                            )
                    }
                ]}
                data={ statusArray }
                options={{
                    headerStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                style={{padding: '15px 30px', margin: '30px 0'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                Add Status
            </Button>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Add Status</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddStatus(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="status"
                            type="text"
                            value={status}
                            onChange={e=>setStatus(e.target.value)}
                            label="Status"
                            placeholder="Enter Status"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Add Status
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
                <AlertDialogHeader>Delete Status?</AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure you want to delete the status?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => setPopup(false)}>
                    No
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={() => {
                        onDeleteStatus(deleteStatusId)
                        setPopup(false)
                    }}
                    >
                    Yes
                    </Button>
                </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default Status