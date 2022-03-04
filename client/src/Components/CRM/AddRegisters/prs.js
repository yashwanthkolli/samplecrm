import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { useToast } from '@chakra-ui/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { GrFormView } from 'react-icons/gr'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

function PRS({oname}){
    const userData = decodeSessionStorage().payload;
    
    const toast = useToast()
    const [registers, setRegisters] = useState([])
    const [openView, setOpenView] = useState(false)
    const [selectedRegister, setSelectedRegister] = useState()
    const [registerLogs, setRegisterLogs] = useState()
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getRegisters`, {
            oname:"PRS"
        })
            .then(res => setRegisters(res.data.registers))
            .catch(err => {
                toast({
                    description: "Error In Fetching Registers",
                    duration: 2000,
                    position: "top-right"
                })
            })
    }, [toast])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getLogs`, {
            oname:"PRS",
            regid: selectedRegister ? selectedRegister.regid : null,
            scode: userData.scd
        })
        .then(res => setRegisterLogs(res.data.logs))
        .catch(err => {
            toast({
                description: "Error In Fetching Logs",
                duration: 2000,
                position: "top-right"
            })
        })
    }, [toast, selectedRegister])

    const onViewClose = () => {
        setOpenView(false)
        setRegisterLogs()
        setSelectedRegister()
    }

    return(
        <div  style={{width: '90%'}}>
        <MaterialTable
                    title="Registers"
                    columns={[
                        { title: 'Register Name', field: 'regname', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
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
                                        setSelectedRegister(rowData)
                                    }}
                                >
                                    <Icon component={GrFormView} />
                                </button>
                            )
                        }
                    ]}
                    data={ registers }
                    options={{
                        headerStyle: {
                            backgroundColor: '#EEE',
                        }
                    }}
                    style={{padding: '15px 30px', margin: '30px 0'}}
            />
            
            <Dialog open={openView} fullWidth maxWidth='xl' onClose={() => onViewClose()}>
                <DialogTitle style={{marginTop: '20px'}}>{selectedRegister ? selectedRegister.regname : null}</DialogTitle>
                <DialogContent>
                    <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Shift', field: 'shift', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'userid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Login Time', field: 'login_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Commencing No.', field: 'commencing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing No.', field: 'closing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Logout Time', field: 'logout_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'ITC', field: 'ITC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'NI', field: 'NI', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CAN', field: 'CAN', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'SPCAN', field: 'SPCAN', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Total Tickets', field: 'total_ticket', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No. of Pass', field: 'Number_of_pass', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Cash', field: 'CASH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Voucher', field: 'Vouncher', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'POS', field: 'POS', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'E-Cash', field: 'Ecash', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'UPI Payment', field: 'UPI_PAYMENT', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Grand Total', field: 'Gtotal', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Partroll Ending No.', field: 'Partroll_ending_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'HOC', field: 'HOC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'TOC', field: 'TOC', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                        ]}
                        data={ registerLogs }
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default PRS;