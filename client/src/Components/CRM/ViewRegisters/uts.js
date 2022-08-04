import React, { useEffect, useState } from 'react'
import MaterialTable from 'material-table'
import axios from 'axios'
import Icon from '@material-ui/core/Icon';
import { useToast } from '@chakra-ui/react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { GrFormView } from 'react-icons/gr'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import { AtvmTable, CrpTable, EarTable, FrTable, LogTable, MmrTable, MvrTable, NitTable, PcdTable, SctTable, TrrTable, TsiTable } from './registersList'

function UTS({oname}){
    const userData = decodeSessionStorage().payload;
    const toast = useToast()
    const [registers, setRegisters] = useState([])
    const [openView, setOpenView] = useState(false)
    const [selectedRegister, setSelectedRegister] = useState()
    const [registerLogs, setRegisterLogs] = useState()
    const [update, setUpdate] = useState(false);
    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getRegisters`, {
            oname:"UTS"
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
            oname:"UTS",
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
    }, [toast, selectedRegister, userData.scd,update])

    const onViewClose = () => {
        setOpenView(false)
        setRegisterLogs()
        setSelectedRegister()
    }

    console.log(selectedRegister)

    return(
        <div  style={{width: '90%'}}>
        <MaterialTable
                    title="Registers"
                    columns={[
                        { title: 'Register Name ', field: 'regname', cellStyle: {textAlign: 'center',fontSize:'22px',fontWeight:'bold'} , headerStyle: {textAlign: 'center',fontSize:'25px',fontWeight:'bold',color:'#05227B'} },
                        {
                            title: 'View',
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
                    { selectedRegister && selectedRegister.regid === '1' ? <LogTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '4' ? <PcdTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '5' ? <NitTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '7' ? <SctTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '9' ? <MmrTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '11' ? <FrTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '13' ? <TsiTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '18' ? <CrpTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    { selectedRegister && selectedRegister.regid === '19' ? <MvrTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    {selectedRegister && selectedRegister.regid === '20' ? <TrrTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    {selectedRegister && selectedRegister.regid === '21' ? <AtvmTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                    {selectedRegister && selectedRegister.regid === '22' ? <EarTable update={update} setUpdate={setUpdate} data={registerLogs} /> : null}
                </DialogContent>
            </Dialog>
        </div>
    )
}


export default UTS;