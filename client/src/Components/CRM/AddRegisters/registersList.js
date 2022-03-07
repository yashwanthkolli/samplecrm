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
            tableName, date, shift, userid, loginTime, commencingNo, closingNo, logoutTime, itc, ni, can, sp, noofpass, cash, vouncher, pos, ecash, ubi, partroll,oname, scode, registerid
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
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
} 

export const PcdForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'pcd'
    const [design ,setDesign]=useState()
    const[shift,setShift]=useState()
    const[figures,setFigures]=useState()
    const[words,setWords]=useState()
    const[twot,setTwot]=useState()
    const[fiveh,setFiveh]=useState()
    const[twoh,setTwoh]=useState()
    const[oneh,setOneh]=useState()
    const[fifty,setFifty]=useState()
    const[name,setName]=useState()
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 3
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addPcdRegisters`, {
            tableName, date,oname,  userid, name,design, shift,figures,words,twot,fiveh,twoh,oneh,fifty, scode, registerid
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
                type="text"
                label="Name"
                name="Name"
                value={name}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setName(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Design"
                name="Design"
                value={design}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setDesign(e.target.value)}
            />
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
                type="number"
                label="Figures"
                name="Figures"
                value={figures}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFigures(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Words"
                name="words"
                value={words}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setWords(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="2000"
                name="2000"
                value={twot}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTwot(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="500"
                name="500"
                value={fiveh}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFiveh(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="200"
                name="200"
                value={twoh}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTwoh(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="100"
                name="100"
                value={oneh}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setOneh(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="fifty"
                label="50"
                name="50"
                value={fifty}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFifty(e.target.value)}
            />
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}


export const NitForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'nit'
    const[pnr ,setPnr]=useState()
    const[nitkt,setNitkt]=useState()
    const[newtkt,setNewtkt]=useState()
    const[tostn,setTostn]=useState()
    const[fare,setFare]=useState()
    const[cis,setCis]=useState()
    const[ad,setAd]=useState()
    const[ch,setCh]=useState()
    const[reason,setReason]=useState()
    const[nxtfare,setNxtfare]=useState()
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 6
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addNitRegisters`, {
            tableName, date,oname,  userid,pnr,nitkt,newtkt,tostn,fare,cis,ad,ch,reason,nxtfare, scode, registerid
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
                type="number"
                label="Journey ticket/Pnr"
                name="Journey ticket/Pnr"
                value={pnr}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPnr(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="NI ticket number"
                name="NI Ticket number"
                value={nitkt}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNitkt(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label="New ticket/pnr"
                type="number"
                name="new ticket/pnr"
                value={newtkt}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNewtkt(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="To Station "
                name="To station"
                value={tostn}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTostn(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Fare"
                name="Fare"
                value={fare}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFare(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="CLS"
                name="CLS"
                value={cis}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCis(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="AD"
                name="AD"
                value={ad}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setAd(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="CH"
                name="CH"
                value={ch}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCh(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Reason for NI"
                name="REASoN FOR NI"
                value={reason}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setReason(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Ticket Fare"
                name="Ticket Fare"
                value={nxtfare}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNxtfare(e.target.value)}
            />
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}


export const MmrForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'mmr'
    const[tktno ,setTktno]=useState()
    const[commencingmismatch,setCommencingmismatch]=useState()
    const[noofjumped,setNoofjumped]=useState()
    const[mismatchqty,setMismatchqty]=useState()
    const[reasonofmismatch,setReasonofmismatch]=useState()
    const Time = JSON.parse(localStorage.getItem('Time'))
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 10
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addMmrRegisters`, {
            tableName, date,oname,Time,userid,tktno,commencingmismatch,noofjumped,mismatchqty,reasonofmismatch, scode, registerid
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
                type="number"
                label="Ticket No"
                name="Ticket No"
                value={tktno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTktno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Commencing number of Mismatch"
                name="Commencing number of Mismatch"
                value={commencingmismatch}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCommencingmismatch(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label="Number of tickets removed/jumped"
                type="number"
                name="Number of tickets removed/jumped"
                value={noofjumped}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNoofjumped(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Mismatch Quantity"
                name=" Mismatch Quantity"
                value={mismatchqty}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setMismatchqty(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Reason of Mismatch"
                name="Reason of Mismatch"
                value={reasonofmismatch}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setReasonofmismatch(e.target.value)}
            />
        
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}  



export const TsiForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'tsi'
    const[rollno ,setRollno]=useState()
    const[commencingno,setCommencingno]=useState()
    const[closingno,setClosingno]=useState()
    const[insertiondate,setInsertiondate]=useState()
    const[onhandrollno,setOnHandrollno]=useState()
    const Time = JSON.parse(localStorage.getItem('Time'))
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 14
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addTsiRegisters`, {
            tableName, oname,userid,rollno,commencingno,closingno,insertiondate,onhandrollno,scode,registerid
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
                type="number"
                label="Roll No"
                name="Roll No"
                value={rollno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRollno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Commencing number "
                name="Commencing number "
                value={commencingno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCommencingno(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label=" Closing Number "
                type="number"
                name=" Closing Number "
                value={closingno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setClosingno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="date"
                label="insertion date"
                name=" insertion date"
                value={insertiondate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setInsertiondate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="On Hand Rolls"
                name="On Hand Rolls"
                value={onhandrollno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setOnHandrollno(e.target.value)}
            />
        
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}  


export const TsiUTSForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'tsi'
    const[rollno ,setRollno]=useState()
    const[commencingno,setCommencingno]=useState()
    const[closingno,setClosingno]=useState()
    const[insertiondate,setInsertiondate]=useState()
    const[onhandrollno,setOnHandrollno]=useState()
    const Time = JSON.parse(localStorage.getItem('Time'))
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 13
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addTsiRegisters`, {
            tableName, oname,userid,rollno,commencingno,closingno,insertiondate,onhandrollno,scode,registerid
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
                type="number"
                label="Roll No"
                name="Roll No"
                value={rollno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRollno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Commencing number "
                name="Commencing number "
                value={commencingno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCommencingno(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label=" Closing Number "
                type="number"
                name=" Closing Number "
                value={closingno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setClosingno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="date"
                label="insertion date"
                name=" insertion date"
                value={insertiondate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setInsertiondate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="On Hand Rolls"
                name="On Hand Rolls"
                value={onhandrollno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setOnHandrollno(e.target.value)}
            />
        
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}  



export const NcrForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'ncr'
    const[slno ,setSlno]=useState()
    const[permissionno,setPermissionno]=useState()
    const[pnrno,setPnrno]=useState()
    const[originalname,setOriginalname]=useState()
    const[changename,setChangename]=useState()
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 16
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addNcrRegisters`, {
            tableName, date,oname,userid,slno,permissionno,pnrno,originalname,changename,scode,registerid
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
                type="number"
                label="Sl No"
                name="Sl No"
                value={slno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setSlno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Permission number "
                name="Permission number "
                value={permissionno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPermissionno(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label=" PNR Number "
                type="number"
                name=" PNR Number "
                value={pnrno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPnrno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Original name"
                name=" Original name"
                value={originalname}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setOriginalname(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Change name"
                name="Change name"
                value={changename}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setChangename(e.target.value)}
            />
        
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}
export const WleForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'wle'
    const[slno ,setSlno]=useState()
    const[trainno,setTrainno]=useState()
    const[journeydate,setJourneydate]=useState()
    const[classno,setClassno]=useState()
    const[watinglistno,setWatinglistno]=useState()
    const[authoritytno,setAuthorityno]=useState()
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 17
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addWleRegisters`, {
            tableName, date,oname,slno,trainno,journeydate,classno,watinglistno,authoritytno,scode,registerid
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
                type="number"
                label="Sl No"
                name="Sl No"
                value={slno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setSlno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Train number "
                name="Train number "
                value={trainno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTrainno(e.target.value)}
            />
            <TextField 
                required
                autoComplete="off"
                label=" Journey Date "
                type="date"
                name=" Journey Date "
                value={journeydate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setJourneydate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Class Number"
                name=" Class Number"
                value={classno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setClassno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Waiting List Number"
                name="Waiting List Number"
                value={watinglistno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setWatinglistno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Authority Number"
                name="Authority Number"
                value={authoritytno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setAuthorityno(e.target.value)}
            />
        
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}


export const SctForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'sct'
    const[pnr,setPnr]=useState()
    const[spcantkt,setSpcantkt]=useState()
    const[tostn,setTostn]=useState()
    const[fare,setFare]=useState()
    const[cis,setCis]=useState()
    const[ad,setAd]=useState()
    const[ch,setCh]=useState()
    const[reason,setReason]=useState()
	const[freshtkt,setFreshtkt]=useState()
    const[nxtfare,setNxtfare]=useState()
    const userid = userData.sid
    const date = moment().format('YYYY-MM-DD')
    const scode = userData.scd
    const registerid = 8
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addSctRegisters`, {
            tableName, date,oname,  userid,pnr,spcantkt,tostn,fare,cis,ad,ch,reason,freshtkt,nxtfare, scode, registerid
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
                type="number"
                label="Journey ticket/Pnr"
                name="Journey ticket/Pnr"
                value={pnr}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPnr(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Special Cancellation ticket number"
                name="Special Cancellation ticket number"
                value={spcantkt}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setSpcantkt(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="To Station "
                name="To station"
                value={tostn}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTostn(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Fare"
                name="Fare"
                value={fare}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFare(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="CLS"
                name="CLS"
                value={cis}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCis(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="AD"
                name="AD"
                value={ad}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setAd(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="CH"
                name="CH"
                value={ch}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setCh(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Reason for Special Cancellation"
                name="Reason for Special Cancellation"
                value={reason}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setReason(e.target.value)}
            />
			<TextField
                required
                autoComplete="off"
                type="number"
                label="Fresh ticket/PNR"
                name="Fresh ticket/PNR"
                value={freshtkt}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFreshtkt(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Ticket Fare"
                name="Ticket Fare"
                value={nxtfare}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setNxtfare(e.target.value)}
            />
            
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}










export const FrForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'fr'
    const[fdate,setFdate]=useState()
    const[ftime,setFtime]=useState()
    const[repdate,setRepdate]=useState()
    const[reptime,setReptime]=useState()
    const[recdate,setRecdate]=useState()
    const[rectime,setRectime]=useState()
    const[fdetails,setFdetails]=useState()
    const[rto,setRto]=useState()
	const[rby,setRby]=useState()
    const userid = userData.sid
    const scode = userData.scd
    const registerid = 12
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addFrRegisters`, {
            tableName,oname,userid,fdate,ftime,repdate,recdate,reptime,rectime,fdetails,rto,rby, scode, registerid
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
                type="Date"
                label="Failure date"
                name="Failure date"
                value={fdate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFdate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Failure time"
                name="Failure time"
                value={ftime}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFtime(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="Date"
                label="Reporting Date "
                name="Reporting Date"
                value={repdate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRepdate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Reporting time"
                name="Reporting time"
                value={reptime}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setReptime(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="Date"
                label="Rectification Date"
                name="Rectification Date"
                value={recdate}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRecdate(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Rectification time"
                name="Rectification time"
                value={rectime}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRectime(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Failure details"
                name="Failure details"
                value={fdetails}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFdetails(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Reported To"
                name="Reported To"
                value={rto}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRto(e.target.value)}
            />
			<TextField
                required
                autoComplete="off"
                type="text"
                label="Rectified By"
                name="Rectified By"
                value={rby}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRby(e.target.value)}
            />           
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}




export const BbrForm=({oname}) => {
    const toast = useToast()
    const userData = decodeSessionStorage().payload;
    const tableName = 'bbr'
    const[slno,setSlno]=useState()
    const[party,setParty]=useState()
    const[pauth,setPauth]=useState()
    const[tno,setTno]=useState()
    const[doj,setDoj]=useState()
    const[frm,setFrm]=useState()
    const[to,setTo]=useState()
    const[permit,setPermit]=useState()
	const[booked,setBooked]=useState()
	const[rov,setRov]=useState()
	const date = moment().format('YYYY-MM-DD')
    const userid = userData.sid
    const scode = userData.scd
    const registerid = 15
    console.log(oname) 
    console.log(userData)

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_CONFIG}/addBbrRegisters`, {
            tableName,oname,slno,date,party,pauth,tno,doj,frm,to,permit,booked,rov,scode, registerid
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
                type="number"
                label="Sl No."
                name="Sl No."
                value={slno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setSlno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="Party Name and Address along with Phone number"
                name="Party Name and Address along with Phone number"
                value={party}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setParty(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Permission Authority No."
                name="Permission Authority No."
                value={pauth}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPauth(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="Train No."
                name="Train No."
                value={tno}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTno(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="Date"
                label="Date of Journey"
                name="Date of Journey"
                value={doj}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setDoj(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="From"
                name="From"
                value={frm}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setFrm(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="text"
                label="To"
                name="To"
                value={to}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setTo(e.target.value)}
            />
            <TextField
                required
                autoComplete="off"
                type="number"
                label="No. of Pass Permit"
                name="No. of Pass Permit"
                value={permit}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setPermit(e.target.value)}
            />
			<TextField
                required
                autoComplete="off"
                type="number"
                label="No. of Pass Booked"
                name="No. of Pass Booked"
                value={booked}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setBooked(e.target.value)}
            />    
			<TextField
                required
                autoComplete="off"
                type="text"
                label="Reasons for Variation"
                name="Reasons for Variation"
                value={rov}
                style={{marginRight: '40px',marginBottom: '20px'}}
                onChange={e => setRov(e.target.value)}
            />        
            <DialogActions>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained">
                    Cancel
                </Button>
                <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginRight:'20.5px'}} variant="contained">
                    Add 
                </Button>
            </DialogActions>
        </form>
    )
}