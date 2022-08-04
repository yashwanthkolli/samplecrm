import MaterialTable from 'material-table'
import axios from 'axios'
import { LogForm } from '../AddRegisters/registersList.js'
import { useToast } from '@chakra-ui/react';
import Icon from '@material-ui/core/Icon';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from "@chakra-ui/react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';


export const LogTable = ({update, setUpdate, data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const [editRegister, setEditRegister] = useState({})
    const [openEdit, setOpenEdit] = useState(false)
    const onDeleteRegister = (id) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteRegister`, {
            tableName: 'log', 
            id: id
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }

    console.log(editRegister)
    return(
        <div>
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
                    { 
                        title: 'Edit',
                        field: 'edit_action',
                        cellStyle: {textAlign: 'center'},
                        sorting: false,
                        headerStyle: {textAlign: 'center'},
                        render: (rowData) =>
                            rowData && (
                            <button
                                color="secondary"
                                onClick={() => {
                                    setOpenEdit(true)
                                    setEditRegister(rowData)
                                }}
                            >
                                <Icon component={AiFillEdit} />
                            </button>
                        )
                    },
                    {
                        title: 'Delete',
                        field: 'delete_action',
                        cellStyle: {textAlign: 'center'},
                        sorting: false,
                        headerStyle: {textAlign: 'center'},
                        render: (rowData) =>
                            rowData && (
                            <button
                                color="secondary"
                                onClick={() => {
                                    setDeleteWarning(true)
                                    setDeleteUserId(rowData.id)
                                }}
                            >
                                <Icon component={AiFillDelete} />
                            </button>
                        )
                    }
                ]}
                data={data}
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
                    <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure you want to delete the user?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={() => setDeleteWarning(false)}>
                        No
                        </Button>
                        <Button colorScheme="red" ml={3} onClick={() => {
                            onDeleteRegister(deleteUserId)
                            setDeleteWarning(false)
                        }}
                        >
                        Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <Dialog open={openEdit} fullWidth maxWidth='xl' onClose={() => {
                setOpenEdit(false)
                setEditRegister({})
            }}>
                <DialogTitle style={{marginTop: '20px'}}>Edit Log Book</DialogTitle>
                <DialogContent>
                    <LogForm editData={editRegister} setOpenEdit={setOpenEdit} setEditRegister={setEditRegister}/>
                </DialogContent>
            </Dialog>
        </div>
    )
} 

export const PcdTable = ({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (pcdid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deletePcdRegister`, {
            tableName: 'pcd', 
            pcdid: pcdid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'stid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name', field: 'sname', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Design', field: 'design', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Shift', field: 'Shift', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Figures', field: 'Figures', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Words', field: 'Words', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: '2000', field: 'TWOT', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: '500', field: 'FIVEH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: '200', field: 'TWOH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: '100', field: 'ONEH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: '50', field: 'FIFTY', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.pcdid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const NitTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (nitid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteNitRegister`, {
            tableName: 'nit', 
            nitid: nitid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
    <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'PNR', field: 'PNR', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'NI TICKET NUMBER', field: 'NI_tkt_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'NEW TICKET', field: 'New_tkt', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'TO STATION', field: 'To_station', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'FARE', field: 'Fare', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CIS', field: 'CIs', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'AD', field: 'CH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reason for NI', field: 'Reason_for_NI', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Next ticket Fare', field: 'Next_tkt_Fare', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.nitid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }
                    
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                                fontSize:'20px',
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const SctTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (sctid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteSctRegister`, {
            tableName: 'sct', 
            sctid: sctid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
    <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Journey Ticket/PNR', field: 'PNR', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title:'Special Cancellation ticket Number ', field: 'Sp_Can_tkt_no', cellStyle: {textAlign: 'center',fontSize:'18px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'To Station', field: 'To_station', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Fare', field: 'Fare', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'CIS', field: 'CIs', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'AD', field: 'CH', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Reason for Special Cancellation', field: 'Reason_for_Sp_Can', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Fresh ticket/PNR', field: 'Fresh_tkt', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Fare', field: 'Sp_Can_Fare', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            {
                                title: 'Delete',
                                
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center',fontSize:'23px'},
                                sorting: false,
                                headerStyle: {textAlign: 'center',fontSize:'23px'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.sctid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const MmrTable=({update,setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (mmrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteMmrRegister`, {
            tableName: 'mmr', 
            mmrid: mmrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: ' Mismatch Noticed Time', field: 'Time', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title:' Mismatch Noticed ticket Number ', field: 'Tkt_No', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Commencing Number of Mismatch', field: 'Commencing_No_of_Mismatch', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Number of Tickets removed/Jumped To Rectify the mismatch', field: 'No_of_tkt_removed_jumped', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Mismatch Quantity', field: 'Mismatch_Qty', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Reason of Mismatch', field: 'Reason_of_Mismatch', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center',fontSize:'23px'},
                                sorting: false,
                                headerStyle: {textAlign: 'center',fontSize:'23px'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.mmrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const FrTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (frid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteFrRegister`, {
            tableName: 'fr', 
            frid: frid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center',fontSize:'23px',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Failure Date', field: 'Failure_Date', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: ' Failure Time', field: 'Failure_time', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title:' Reporting Date ', field: 'Reporting_Date', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Reporting Time', field: 'Reporting_time', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Rectification Date', field: 'Rectification_Date', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Rectification Time', field: 'Rectification_time', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Failure Details', field: 'failure_details', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Reported To', field: 'Reported_to', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Rectified by', field: 'Rectifited_by', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center',fontSize:'23px'},
                                sorting: false,
                                headerStyle: {textAlign: 'center',fontSize:'23px'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.frid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }    
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const TsiTable=({update,setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (tsiid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteTsiRegister`, {
            tableName: 'tsi', 
            tsiid: tsiid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
 return(
     <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Roll No', field: 'Roll_No', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Commencing No', field: 'commencing_number', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Closing No', field: 'closing_number', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title:' ID ', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'Insertion Date', field: 'Insertion_date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            { title: 'On Hand Rolls', field: 'On_hand_Rolls', cellStyle: {textAlign: 'center',fontSize:'23px'}, headerStyle: {textAlign: 'center',fontSize:'23px'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center',fontSize:'23px'},
                                sorting: false,
                                headerStyle: {textAlign: 'center',fontSize:'23px'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.tsiid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }


                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const BbrTable=({update, setUpdate, data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (bbrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteBbrRegister`, {
            tableName: 'bbr', 
            bbrid: bbrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Party name and address along with phone no', field: 'Party_name_and_address', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Permission authority No ', field: 'Permission_authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Train No', field: 'Train_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of Journey', field: 'Date_of_Journey', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'From', field: 'From_a', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'To', field: 'To_a', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No of pass permit', field: 'No_of_pass_permit', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No of pass booked', field: 'No_of_pass_Booked', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reasons for Variation', field: 'Reason_for_variation', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.bbrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const NcrTable=({update,setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (ncrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteNcrRegister`, {
            tableName: 'ncr', 
            ncrid: ncrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title=" Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Permission authority No ', field: 'Permission_authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'PNR', field: 'PNR_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name of Passenger(original)', field: 'Original_Name_of_passenger', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name of Passenger(changed)', field: 'Change_Name_of_passenger', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.ncrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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


export const WleTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (wleid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteWleRegister`, {
            tableName: 'wle', 
            wleid: wleid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title=" Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Train No ', field: 'Train_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Journey Date', field: 'Journey_Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Class', field: 'Class', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Waiting list extended numbers', field: 'Waiting_list_Extended_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Authority Number', field: 'Authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.wleid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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


export const CrpTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (crpid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteCrpRegister`, {
            tableName: 'crp', 
            crpid: crpid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title=" Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of cash generated', field: 'date_of_cash_gen', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Cash ', field: 'cash', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'VCH s', field: 'vchs', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of remitance', field: 'date_of_remitance', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Amount remitance', field: 'amount_remitance', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'HCl No. Part-A', field: 'hcl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'SBI Challan No.', field: 'sbi_challan', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Cash Hand over by Rly Staff', field: 'cash_rly', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Cash Received by Radient Staff', field: 'cash_rad', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CR Note No.', field: 'cr_note', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of dispatch of CR Note', field: 'date_of_dispatch', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CR Note Acknowledgement Received', field: 'cr_note_ack', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.crpid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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

export const MvrTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (mvrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteMvrRegister`, {
            tableName: 'mvr', 
            mvrid: mvrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Money Value Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'EFT/BPT Number From', field: 'frm', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' EFT/BPT Number To', field: 'too', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Commencing Date', field: 'commencing_date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Issued To', field: 'issue_to', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing Date', field: 'closing_date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.mvrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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
export const TrrTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (trrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteTrrRegister`, {
            tableName: 'trr', 
            trrid: trrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Ticket Roll Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Roll No', field: 'rollno', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Commencing Number', field: 'commencing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing NUmber', field: 'closing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Counter No', field: 'counter_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'User ID', field: 'userid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Supervisor ID', field: 'supervisor_id', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.trrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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
export const AtvmTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (atvmid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteAtvmRegister`, {
            tableName: 'atvm', 
            atvmid: atvmid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="ATVM Ticket Roll Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Roll No', field: 'rollno', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Commencing Number', field: 'commencing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing NUmber', field: 'closing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Counter No', field: 'counter_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'User ID', field: 'userid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Supervisor ID', field: 'supervisor_id', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.atvmid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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
export const EarTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (earid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteEarRegister`, {
            tableName: 'ear', 
            earid: earid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Error Advice Receipt/Account/Clearence Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Error Sheet Number', field: 'error_sheet_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Total Amount', field: 'total_amount', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Special Credit', field: 'special_credit', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Amount Paid', field: 'amount_paid', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name of Staff', field: 'name_of_staff', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Money Receipt', field: 'money_receipt', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Date', field: 'date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Remarks', field: 'remarks', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.earid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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
export const GbrTable=({update, setUpdate,data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
    const onDeleteRegister = (gbrid) => {
        axios.post(`${process.env.REACT_APP_CONFIG}/deleteGbrRegister`, {
            tableName: 'gbr', 
            gbrid: gbrid
        })
        .then(res => {
            setUpdate(!update);
            toast({
                description: "Register Deleted",
                duration: 2000,
                position: "top"
            })
        })
        .catch(err => {
            toast({
                description: "Error In Deleting Register",
                duration: 2000,
                position: "top"
            })
        })
    }
    return(
        <div>
        <MaterialTable 
                        title="Group Booking Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Date', field: 'date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Address of Passenger Mobile No.', field: 'address', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Train No.', field: 'trainno', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of Journey', field: 'date_of_journey', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'From', field: 'frm', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'To', field: 'too', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No. Of Passenger', field: 'noofpass', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Class of Journey', field: 'class_of_journey', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Journey Purpose', field: 'journey_purpose', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Authority', field: 'authority', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            {
                                title: 'Delete',
                                field: 'delete_action',
                                cellStyle: {textAlign: 'center'},
                                sorting: false,
                                headerStyle: {textAlign: 'center'},
                                render: (rowData) =>
                                    rowData && (
                                    <button
                                        color="secondary"
                                        onClick={() => {
                                            setDeleteWarning(true)
                                            setDeleteUserId(rowData.gbrid)
                                        }}
                                    >
                                        <Icon component={AiFillDelete} />
                                    </button>
                                )
                            }

                            
                            
                    
                        ]}
                        data={data}
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
                        <AlertDialogHeader>Delete Register?</AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure you want to delete the user?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={() => setDeleteWarning(false)}>
                            No
                            </Button>
                            <Button colorScheme="red" ml={3} onClick={() => {
                                onDeleteRegister(deleteUserId)
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