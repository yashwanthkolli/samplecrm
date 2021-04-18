import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
  } from "@chakra-ui/react"

function Courses() {

    const [update, setUpdate] = useState(false);
    const [courses, setCourses] = useState([])
    const [openAddCourseForm, setOpenAddCourseForm] = useState(false)
    const [openUpdateCourseForm, setOpenUpdateCourseForm] = useState(false)
    const [updateCourseForm, setUpdateCourseForm] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [cost, setCost] = useState('')
    const [popup, setPopup] = useState(false)
    const [deleteCourseId, setDeleteCourseId] = useState()

    useEffect( () => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getCourses`, { email: JSON.parse(localStorage.getItem('user')).Email })
        .then(res => setCourses(res.data.courses))
        .catch(err => console.log(err))
    }, [])

    const onDeleteCourse = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteCourses`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            id: id
        })
        .then(res => {
            setUpdate(!update)
        })
        .catch(err => {})
    }

    const onAddCourse = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_CONFIG}/addCourses`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            name,
            type,
            cost
        })
        .then(res => {
            setName('')
            setType('')
            setCost('')

            setUpdate(!update);
        })
        .catch(err => {})
    }

    const onUpdateCourse = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/updateCourses`, {
            email: JSON.parse(localStorage.getItem('user')).Email,
            id,
            name,
            type,
            cost
        })
        .then(res => {
            setName('')
            setType('')
            setCost('')
            setUpdateCourseForm('')

            setUpdate(!update);
        })
        .catch(err => console.log(err))
    }

    const onCloseForm = () => {
        setName('')
        setType('')
        setCost('')
        setOpenAddCourseForm(false)
        setOpenUpdateCourseForm(false)
        setUpdateCourseForm('')
    }

    return (
        <div style={{width: '90%'}}>
            <MaterialTable
                title="Courses"
                columns={[
                    { title: 'Course', field: 'name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Type', field: 'type', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    { title: 'Cost in Rs', field: 'Cost', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                    {
                        title: 'Delete / Edit',
                        field: 'internal_action',
                        cellStyle: {textAlign: 'center'},
                        headerStyle: {textAlign: 'center'},
                        sorting: false,
                        render: (rowData) =>
                            rowData && (
                                <div>
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setPopup(true)
                                            setDeleteCourseId(rowData.id)
                                        }}
                                        style={{marginRight: '20px'}}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setOpenUpdateCourseForm(true)
                                            setUpdateCourseForm(rowData.id)
                                            setName(rowData.name)
                                            setType(rowData.type)
                                            setCost(rowData.Cost)
                                            }
                                        }
                                    >
                                        <Icon component={AiFillEdit} />
                                    </button>
                                </div>
                            )
                    }
                ]}
                data={ courses }
                options={{
                    headerStyle: {
                        backgroundColor: '#EEE',
                    }
                }}
                style={{padding: '15px 30px', margin: '30px 0'}}
            />
            <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px', float: 'right'}} variant="contained"  onClick={() => setOpenAddCourseForm(!openAddCourseForm)}>
                Add Course
            </Button>
            <Dialog open={openAddCourseForm} fullWidth onClose={() => onCloseForm()} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Add Course</DialogTitle>
                <DialogContent>
                    <form onSubmit={ (e) => onAddCourse(e) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            label="Name"
                            placeholder="Enter Course Name"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="type"
                            type="text"
                            value={type}
                            onChange={e=>setType(e.target.value)}
                            label="Type"
                            placeholder="Enter Course Type"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="cost"
                            type="text"
                            value={cost}
                            onChange={e=>setCost(e.target.value)}
                            label="Cost"
                            placeholder="Enter Course Cost"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Add Course
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog open={openUpdateCourseForm} fullWidth onClose={() => onCloseForm()} aria-labelledby="add-new-lead">
                <DialogTitle id="form-dialog-title" style={{marginTop: '20px'}}>Update Course</DialogTitle>
                <DialogContent>
                    <form onSubmit={ () => onUpdateCourse(updateCourseForm) }>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="name"
                            type="text"
                            value={name}
                            onChange={e=>setName(e.target.value)}
                            label="Name"
                            placeholder="Enter Course Name"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="type"
                            type="text"
                            value={type}
                            onChange={e=>setType(e.target.value)}
                            label="Type"
                            placeholder="Enter Course Type"
                            style={{marginBottom: '7px'}}
                        />
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="cost"
                            type="text"
                            value={cost}
                            onChange={e=>setCost(e.target.value)}
                            label="Cost"
                            placeholder="Enter Course Cost"
                            style={{marginBottom: '7px'}}
                        />
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', margin: '20px 5px'}} variant="contained">
                            Update
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
                <AlertDialogHeader>Delete Course?</AlertDialogHeader>
                <AlertDialogBody>
                    Are you sure you want to delete the course?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button onClick={() => setPopup(false)}>
                    No
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={() => {
                        onDeleteCourse(deleteCourseId)
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

export default Courses