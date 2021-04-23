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

function Comments() {


    const classes = useStyles();
    const toast = useToast();
    const comment_toast = "comment";

    const [update, setUpdate] = useState(false);

    const [comments, setComments] = useState([])
    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState('')
    const [popup, setPopup] = useState(false)
    const [deleteCommentId, setDeleteCommentId] = useState()

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getComments`, { email: JSON.parse(sessionStorage.getItem('user')).Email })
        .then(res => setComments(res.data.comments))
        .catch(err => {})
    }, [update])

    const onDeleteComment = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteComments`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email,
            id: id
        })
        .then(res => {
            if(!toast.isActive(comment_toast)){
                toast({
                    id: comment_toast,
                    description: "Deleted Successfully",
                    duration: 3000,
                    position: "top"
                }) 
            }
            setUpdate(!update);
        })
        .catch(err => {
            if(!toast.isActive(comment_toast)){
                toast({
                    id: comment_toast,
                    description: "Deleting Comments Failed",
                    duration: 3000,
                    position: "top"
                }) 
            }
        })
    }

    const onAddComment = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_CONFIG}/addComments`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email,
            comment
        })
        .then(res => {
            toast({
                description: "Comment Added",
                duration: 2000,
                position: "top"
            })
            setOpen(false)
            setComment('')
            setUpdate(!update);
            if(!toast.isActive(comment_toast)){
                toast({
                    id: comment_toast,
                    description: "Added Successfully",
                    duration: 3000,
                    position: "top"
                }) 
            }
        })
        .catch(err => {
            if(!toast.isActive(comment_toast)){
                toast({
                    id: comment_toast,
                    description: "Adding Comments Failed",
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
                title="Comments"
                columns={[
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
                style={{width: '95%'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpen(!open)}>
                Add Comment
            </Button>
        </Paper>
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
        </>
    )
}

export default Comments