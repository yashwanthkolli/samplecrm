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
import { BbrTable, FrTable, LogTable, MmrTable, NcrTable, NitTable, PcdTable, SctTable, TsiTable, WleTable } from './registersList'

function PRS({oname}){
    const userData = decodeSessionStorage().payload;
    const toast = useToast()
    const [registers, setRegisters] = useState([])
    const [openView, setOpenView] = useState(false)
    const [selectedRegister, setSelectedRegister] = useState()
    const [registerLogs, setRegisterLogs] = useState()
    const [update, setUpdate] = useState(false);
    
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
        axios.post(`${process.env.REACT_APP_CONFIG}/getRegistersData`, {
            oname:"PRS",
            regid: selectedRegister ? selectedRegister.regid : null,
            scode: userData.scd,
            tablename: selectedRegister ? selectedRegister.tablename : null
        })
        .then(res => setRegisterLogs(res.data.logs))
        .catch(err => {
            toast({
                description: "Error In Fetching Logs",
                duration: 2000,
                position: "top-right"
            })
        })
    }, [toast, selectedRegister, userData.scd, update])

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
                    { selectedRegister && selectedRegister.regid === '2' ? <LogTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '3' ? <PcdTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '6' ? <NitTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '8' ? <SctTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '10' ? <MmrTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '12' ? <FrTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '14' ? <TsiTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '15' ? <BbrTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '16' ? <NcrTable data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '17' ? <WleTable data={registerLogs} /> : null}

                </DialogContent>
            </Dialog>
        </div>
    )
}


export default PRS;