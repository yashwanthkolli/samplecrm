import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { useToast } from '@chakra-ui/react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { GrFormView, GrAdd } from 'react-icons/gr'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import { BbrForm, BbrTable, FrForm, FrTable, LogForm, MmrForm, MmrTable, NcrForm, NcrTable, NitForm, NitTable, PcdForm, PcdTable, SctForm, SctTable, TsiForm, TsiTable, WleForm, WleTable } from './registersList'

function PRS(){
    const userData = decodeSessionStorage().payload;
    const toast = useToast()
    const [registers, setRegisters] = useState([])
    const [openView, setOpenView] = useState(false)
    const [selectedRegister, setSelectedRegister] = useState()
    const [registerLogs, setRegisterLogs] = useState()
    const oname=userData.oname
    
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getRegisters`, {
            oname:oname
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
            oname:oname,
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
    }, [toast, selectedRegister, userData.scd])

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
                        { title: 'Register Name ', field: 'regname', cellStyle: {textAlign: 'center',fontSize:'22px',fontWeight:'bold'} , headerStyle: {textAlign: 'center',fontSize:'25px',fontWeight:'bold',color:'#05227B'} },
                        {
                            title: 'Add',
                            field: 'internal_action',
                            cellStyle: {textAlign: 'center',fontSize:'22px',fontWeight:'bold'},
                            sorting: false,
                            headerStyle: {textAlign: 'center',fontSize:'25px',fontWeight:'bold',color:'#05227B'},
                            render: (rowData) =>
                                rowData && (
                                <button
                                    color="secondary"
                                    onClick={() => {
                                        setOpenView(true)
                                        setSelectedRegister(rowData)
                                    }}
                                >
                                    <Icon component={GrAdd} />
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
                    { selectedRegister && selectedRegister.regid === '2' ? <LogForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '3' ? <PcdForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '6' ? <NitForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '8' ? <SctForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '10' ? <MmrForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '12' ? <FrForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '14' ? <TsiForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '15' ? <BbrForm oname={oname} /> : null}
                    { selectedRegister && selectedRegister.regid === '16' ? <NcrForm oname={oname}/> : null}
                    { selectedRegister && selectedRegister.regid === '17' ? <WleForm oname={oname} /> : null}

                </DialogContent>
            </Dialog>
        </div>
    )
}


export default PRS;