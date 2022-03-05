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

function PRS({oname}){
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const [employees, setEmployees] = useState([])
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const [update, setUpdate] = useState(false);
    console.log(employees);
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getSupervisorEmployees`, {
            oname:"PRS",
            scode:userData.scd
        })
            .then(res => setEmployees(res.data.employees))
            .catch(err => {
                toast({
                    description: "Error In Fetching Employees",
                    duration: 2000,
                    position: "top-right"
                })
            })
    }, [update, userData.Employee_ID, toast])

    const onDeleteUser = (sid) => {
        console.log(sid);
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteUser`, {
            email: userData.Email,
            sid: sid
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

    return(
        <div  style={{width: '90%'}}>
        <MaterialTable
                    title="Users"
                    columns={[
                        { title: 'FirstName', field: 'firstname', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'LastName', field: 'lastname', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Email', field: 'email', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Phone No', field: 'mobile', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        { title: 'Role', field: 'role', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
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
                                        console.log(rowData)
                                        setDeleteWarning(true)
                                        setDeleteUserId(rowData.sid)
                                    }}
                                >
                                    <Icon component={AiFillDelete} />
                                </button>
                            )
                        }
                        
                    ]}
                    data={ employees }
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
        </div>
    )
}


export default PRS;