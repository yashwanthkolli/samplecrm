import React, { useEffect, useState } from 'react'
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
    AlertDialogOverlay
  } from "@chakra-ui/react"

function Ads() {
    const [ads, setAds] = useState([])
    const [open, setOpen] = useState(false)
    const [popup, setPopup] = useState(false)
    const [form_id, setForm_id] = useState('')
    const [name, setName] = useState('')
    const [source, setSource] = useState('')
    const [deleteAdId, setDeleteAdId] = useState()

    const [update, setUpdate] = useState(false);

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getAds`, { email: JSON.parse(localStorage.getItem('user')).Email })
        .then(res => setAds(res.data.ads))
        .catch(err => console.log(err))
    }, [update])

    const onDeleteAd = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteAds`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            id: id
        })
        .then(res => {
            setUpdate(!update);
        })
        .catch(err => console.log(err))
    }

    const onAddAd = (e) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/addAds`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            form_id,
            name,
            source
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    return (
        <div style={{width: '90%'}}>
            <MaterialTable
                title="Ads"
                columns={[
                    { title: 'Id', field: 'id', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Name', field: 'name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Medium', field: 'source', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
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
                style={{padding: '15px 30px', margin: '30px 0'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                New Ad
            </Button>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Add Course</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddAd(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="form_id"
                            type="text"
                            value={form_id}
                            onChange={e=>setForm_id(e.target.value)}
                            label="Form Id"
                            placeholder="Enter Form Id"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            label="Name"
                            placeholder="Enter Ad Name"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="source"
                            type="text"
                            value={source}
                            onChange={e=>setSource(e.target.value)}
                            label="Medium"
                            placeholder="Enter Ad Medium"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            New Ad
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
        </div>
    )
}

export default Ads