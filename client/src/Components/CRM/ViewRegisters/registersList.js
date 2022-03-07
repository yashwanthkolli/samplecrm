import MaterialTable from 'material-table'
import axios from 'axios'
import { useToast } from '@chakra-ui/react';
import Icon from '@material-ui/core/Icon';
import { AiFillDelete } from 'react-icons/ai';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay
} from "@chakra-ui/react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export const LogTable = ({update, setUpdate, data}) => {
    const toast = useToast()
    const [deleteWarning, setDeleteWarning] = useState(false)
    const [deleteUserId, setDeleteUserId] = useState()
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
        </div>
    )
} 

export const PcdTable = ({data}) => {
    return(
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
                            { title: '50', field: 'FIFTY', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
} 

export const NitTable=({data}) => {
    return(
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
                            { title: 'Next_tkt_Fare', field: 'ONEH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
} 

export const SctTable=({data}) => {
    return(
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Journey Ticket/PNR', field: 'PNR', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:'Special Cancellation ticket Number ', field: 'Sp_Can_tkt_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'To Station', field: 'To_station', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Fare', field: 'Fare', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'CIS', field: 'CIs', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'AD', field: 'CH', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reason for Special Cancellation', field: 'Reason_for_Sp_Can', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Fresh ticket/PNR', field: 'Fresh_tkt', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Fare', field: 'Sp_Can_Fare', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}

export const MmrTable=({data}) => {
    return(
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Mismatch Noticed Time', field: 'Time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Mismatch Noticed ticket Number ', field: 'Tkt_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Commencing Number of Mismatch', field: 'Commencing_No_of_Mismatch', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Number of Tickets removed/Jumped To Rectify the mismatch', field: 'No_of_tkt_removed_jumped', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Mismatch Quantity', field: 'Mismatch_Qty', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reason of Mismatch', field: 'Reason_of_Mismatch', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }
                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}  

export const FrTable=({data}) => {
    return(
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Failure Date', field: 'Failure_Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: ' Failure Time', field: 'Failure_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Reporting Date ', field: 'Reporting_Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reporting Time', field: 'Reporting_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Rectification Date', field: 'Rectification_Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Rectification Time', field: 'Rectification_time', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Failure Details', field: 'failure_details', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reported To', field: 'Reported_to', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Rectified by', field: 'Rectified_by', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            
                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}  

export const TsiTable=({data}) => {
    return(
        <MaterialTable 
                        title="Registers"
                        columns={[
                            { title: 'Roll No', field: 'Roll_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Commencing No', field: 'commencing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Closing No', field: 'closing_number', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' ID ', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Insertion Date', field: 'Insertion_date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'On Hand Rolls', field: 'On_hand_Rolls', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }

                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}

export const BbrTable=({data}) => {
    return(
        <MaterialTable 
                        title="BULK BOOKING Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Party name and address along with phone no', field: 'party_name_and_address', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Permission authority No ', field: 'Permission_authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Train No', field: 'Train_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date of Journey', field: 'Date_of_Journey', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'From', field: 'From_a', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'To', field: 'To_a', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No of pass permit', field: 'No_of_pass_permit', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'No of pass booked', field: 'No_of_pass_Booked', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Reasons for Variation', field: 'Reasons_for_variation', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }

                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}

export const NcrTable=({data}) => {
    return(
        <MaterialTable 
                        title=" Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Permission authority No ', field: 'Permission_authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'PNR', field: 'PNR_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name of Passenger(original)', field: 'Original_Name_of_passenger', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Name of Passenger(changed)', field: 'Change_Name_of_passenger', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Id', field: 'ID', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }

                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}


export const WleTable=({data}) => {
    return(
        <MaterialTable 
                        title=" Registers"
                        columns={[
                            { title: 'Sl No', field: 'sl_no', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Date', field: 'Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title:' Train No ', field: 'Train_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Journey Date', field: 'Journey_Date', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Class', field: 'Class', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Waiting list extended numbers', field: 'Waiting_list_Extended_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} },
                            { title: 'Authority Number', field: 'Authority_No', cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center'} }

                            
                            
                    
                        ]}
                        data={data}
                        options={{
                            headerStyle: {
                                backgroundColor: '#EEE',
                            }
                        }}
                        style={{padding: '15px 30px', margin: '30px 0'}}
                    />
    )
}