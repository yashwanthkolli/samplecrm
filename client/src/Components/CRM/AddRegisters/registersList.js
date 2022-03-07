import MaterialTable from 'material-table'
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import moment from 'moment';

export const LogForm = ({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'log'
    const [shift, setShift] = useState()
    const [commencingNo, setCommencingNo] = useState()
    const [closingNo, setClosingNo] = useState()
    const [itc, setItc] = useState()
    const [ni, setNi]=useState()
    const [can,setCan]=useState()
    const [sp,setSp]=useState()
    const [noofpass,setNoofpass]=useState()
    const [cash,setCash]=useState()
    const [vouncher,setVouncher]=useState()
    const [pos,setPos]=useState()
    const [ecash,setEcash]=useState()
    const [ubi,setUbi]=useState()
    const [gtotal,setGtotal]=useState()
    const [partroll,setPartroll]=useState()
    const loginTime = JSON.parse(localStorage.getItem('loginTime'))
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const logoutTime = moment().format('YYYY-MM-DD hh:mm:ss')
    const registerid = 2
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addRegisters`, {
            tableName, date, shift, userid, loginTime, commencingNo, closingNo, logoutTime, itc, ni, can, sp, noofpass, cash, vouncher, pos, ecash, ubi, partroll, scode, registerid
        })
            .then(res => {
                toast({
                    description: "Successfully Added",
                    duration: 2000,
                    position: "top-right"
                })
            })
            .catch(err => {
                toast({
                    description: "Error In Fetching Registers",
                    duration: 2000,
                    position: "top-right"
                })
            })
    }

    return(
        <form onSubmit={handleSubmit}>
            <TextField 
                required
                autoComplete="off"
                label="Shift"
                type="number"
                name="firstname"
                value={shift}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setShift(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Commencing Number"
                name="commencingNo"
                value={commencingNo}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCommencingNo(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Closing Number"
                name="commencingNo"
                value={closingNo}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setClosingNo(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="ITC"
                name="itc"
                value={itc}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setItc(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="NI"
                name="NI"
                value={ni}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNi(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="CAN"
                name="CAN"
                value={can}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCan(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="SpCan"
                name="SpCan"
                value={sp}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setSp(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="number of pass"
                name="Number of pass"
                value={noofpass}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNoofpass(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="CASH"
                name="CASH"
                value={cash}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCash(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="VOUCHER"
                name="VOUCHER"
                value={vouncher}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setVouncher(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="POS"
                name="POS"
                value={pos}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPos(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="ECash"
                name="Ecash"
                value={ecash}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setEcash(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="UPI PAYMENT"
                name="UPI PAYMENT"
                value={ubi}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setUbi(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Gtotal"
                name="Grand Total"
                value={gtotal}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setGtotal(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="partroll ending number"
                name="Partroll ending number"
                value={partroll}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPartroll(e.target.value)}
            />
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add Log
                </Button>
            </DialogActions>
        </form>
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