import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { useToast } from '@chakra-ui/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import { AiFillDelete } from 'react-icons/ai';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from "@chakra-ui/react";
import { GrFormView } from 'react-icons/gr'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import moment from 'moment'

function Users() {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;

    const [employees, setEmployees] = useState([])
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const [openView, setOpenView] = useState(false)
    const [seletedUser, setSeletedUser] = useState()
    const [assignedEmployees, setAssignedEmployees] = useState([])

    const presentDate = moment(new Date()).format('YYYY-MM-DD')

    const [selectedDate, setSelectedDate] = useState(presentDate)
    const [selectedDateSessions, setSelectedDateSessions] = useState([])

    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getReportingEmployees`, { id: userData.Employee_ID })
            .then(res => setEmployees(res.data.employees))
            .catch(err => {
                toast({
                    description: "Error In Fetching Employees",
                    duration: 2000,
                    position: "top-right"
                })
            })
    }, [update, userData.Employee_ID, toast])

    useEffect( () => {
        if(seletedUser){
            axios.post(`${process.env.REACT_APP_CONFIG}/getReportingEmployees`, { email: userData.Email, id: seletedUser.Employee_ID })
            .then(res => setAssignedEmployees(res.data.employees))
            .catch(err => {
                toast({
                    description: "Error In Fetching Employees",
                    duration: 2000,
                    position: "top-right"
                })
            })

            const selectedUserTimings = seletedUser.Timings ? JSON.parse(seletedUser.Timings) : []
            var dateExists = false
            selectedUserTimings.forEach(day => {
                if(day.date === selectedDate) {
                    dateExists = true
                    const convertedArray = []
                    day.sessions.forEach(session => {
                        convertedArray.push({loginTime: session[0], logoutTime: session[1], timeDiff: findDuration(session[0], session[1])})
                    })
                    setSelectedDateSessions(convertedArray)
                } 
                if(!dateExists){
                    setSelectedDateSessions([])
                }
            })

        }
    }, [seletedUser, selectedDate, userData.Email, toast])


    const onDeleteUser = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteUser`, {
            email: userData.Email,
            id: id
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "User Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting User",
                duration: 2000,
                position: "top"
            })
        })
    }

    const findDuration = (start, end) => {
        var startTime = moment(start, 'HH:mm')
        var endTime = moment(end, 'HH:mm')
        if(startTime > endTime){
            endTime = endTime.add(24, 'hours')
        }
        var duration = moment.duration(endTime.diff(startTime))
        var timeDiff = duration.hours().toString() + ':' + duration.minutes().toString()
        return timeDiff
    }
    
    const onViewClose = () => {
        setOpenView(false)
        setAssignedEmployees([])
        setSeletedUser()
    }

    return (
        <div style={{width: '90%'}}>
            <MaterialTable
                    title="Users"
                    columns={[
                        { title: 'Name', field: 'Name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Email', field: 'Email', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Phone No', field: 'Mobile', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'City', field: 'City', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Role', field: 'Type', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        {
                            title: 'View',
                            field: 'internal_action',
                            cellStyle: {textAlign: 'center'},
                            sorting: false,
                            headerStyle: {textAlign: 'center'},
                            render: (rowData) =>
                                rowData && (
                                <button
                                    color="secondary"
                                    onClick={() => {
                                        setOpenView(true)
                                        setSeletedUser(rowData)
                                    }}
                                >
                                    <Icon component={GrFormView} />
                                </button>
                            )
                        },
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
                                        setDeleteWarning(true)
                                        setDeleteUserId(rowData.Employee_ID)
                                    }}
                                >
                                    <Icon component={AiFillDelete} />
                                </button>
                            )
                        }
                        
                    ]}
                    data={ employees }
                    parentChildData = {(row, rows) => rows.find(a => a.Employee_ID === row.Reporting)}
                    options={{
                        headerStyle: {
                            backgroundColor: '#EEE',
                        }
                    }}
                    style={{padding: '15px 30px', margin: '30px 0'}}
            />

            <AlertDialog
                motionPreset="slideInTop"
                onClose={ () => setDeleteWarning(false) }
                isOpen={deleteWarning}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete User?</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete the user?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => setDeleteWarning(false)}>
                        No
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={() => {
                            onDeleteUser(deleteUserId)
                            setDeleteWarning(false)
                        }}
                        >
                        Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={openView} fullWidth maxWidth='xl' onClose={() => onViewClose()}>
                <DialogTitle style={{marginTop: '20px'}}>{seletedUser ? seletedUser.Name : null}</DialogTitle>
                <DialogContent>
                    {
                        // Table for reporting workers
                        assignedEmployees.length ?
                        <MaterialTable 
                            title="Assigned Employees"
                            columns={[
                                { title: 'Name', field: 'Name', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                                { title: 'Email', field: 'Email', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                                { title: 'Phone No', field: 'Mobile', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                                { title: 'City', field: 'City', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                                { title: 'Role', field: 'Type', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                            ]}
                            data={ assignedEmployees }
                            options={{
                                headerStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                            style={{padding: '15px 30px', margin: '30px 0'}}
                        /> : null
                    }

                    {/* Form to select Date */}
                    <form noValidate>
                        <TextField
                            id="date"
                            label="Select Date"
                            type="date"
                            defaultValue={presentDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            InputLabelProps={{
                            shrink: true,
                            }}
                        />
                    </form>

                    {/* Table to Show login logout time on seleted date */}
                    <MaterialTable 
                        title="Login Timings"
                        columns={[
                            { title: 'Login Time', field: 'loginTime', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Logout Time', field: 'logoutTime', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Time', field: 'timeDiff', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        ]}
                        data={ selectedDateSessions }
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            },
                            search: false
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Users