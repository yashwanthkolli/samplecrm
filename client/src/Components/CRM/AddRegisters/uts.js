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

function UTS({oname}){
    const toast = useToast()
    const [registers, setRegisters] = useState([])
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getRegisters`, {
            oname:"UTS"
        })
            .then(res => setRegisters(res.data.employees))
            .catch(err => {
                toast({
                    description: "Error In Fetching Employees",
                    duration: 2000,
                    position: "top-right"
                })
            })
    })

    return(
        <div  style={{width: '90%'}}>
        <MaterialTable
                    title="Registers"
                    columns={[
                        { title: 'Register Name', field: 'regname', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }                       
                    ]}
                    data={ registers }
                    options={{
                        headerStyle: {
                            backgroundColor: '#EEE',
                        }
                    }}
                    style={{padding: '15px 30px', margin: '30px 0'}}
            />
            
        </div>
    )
}


export default UTS;