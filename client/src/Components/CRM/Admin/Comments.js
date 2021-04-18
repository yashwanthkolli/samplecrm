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

function Comments() {
    const [comments, setComments] = useState([])
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [popup, setPopup] = useState(false)
    const [deleteCommentId, setDeleteCommentId] = useState()

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getComments`, { email: JSON.parse(localStorage.getItem('user')).Email })
        .then(res => setComments(res.data.comments))
        .catch(err => console.log(err))
    }, [])

    const onDeleteComment = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteComments`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            id: id
        })
        .then(res => {
            axios.post(`${process.env.REACT_APP_CONFIG}/getComments`, { email: JSON.parse(localStorage.getItem('user')).Email })
            .then(res => setComments(res.data.comments))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    const onAddComment = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addComments`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            comment
        })
        .then(res => {
            setOpen(false)
            setComment('')
            axios.post(`${process.env.REACT_APP_CONFIG}/getComments`, { email: JSON.parse(localStorage.getItem('user')).Email })
            .then(res => setComments(res.data.comments))
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }

    return (
        <div style={{width: '90%'}}>
            <MaterialTable
                title="Comments"
                columns={[
                    { title: 'Id', field: 'id', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Comment', field: 'comment', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
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
                                    setDeleteCommentId(rowData.id)
                                }}
                            >
                                <Icon component={AiFillDelete} />
                            </button>
                            )
                    }
                ]}
                data={ comments }
                options={{
                    headerStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                style={{padding: '15px 30px', margin: '30px 0'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                Add Comment
            </Button>
            <Dialog open={open} fullWidth onClose={() => setOpen(false)} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Add Course</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddComment(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="comment"
                            type="text"
                            value={comment}
                            onChange={e=>setComment(e.target.value)}
                            label="Comment"
                            placeholder="Enter Comment"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Add Comment
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
                <AlertDialogHeader>Delete Comment?</AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure you want to delete the comment?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => setPopup(false)}>
                    No
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={() => {
                        onDeleteComment(deleteCommentId)
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

export default Comments