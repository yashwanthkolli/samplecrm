import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'; 
import { useToast } from '@chakra-ui/react'; 
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import {FaWalking, FaMailBulk, FaBookmark} from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';
import Loading from '../../Loading';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';

const useStyles = makeStyles((theme) => ({
    containerLead: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        flexDirection:'column'
    },
    btnNewLead:{
        width: '100%',
        display: 'flex',
        alignItems:'center',
        justifyContent: 'flex-end'
    },
    dialogTitle:{
        fontFamily: 'Nunito !important',
        fontSize: '18px'
    },
    tableHolder:{
        display: 'grid',
        placeItems: 'center',
        width:'100%',
        height: '95%'
    },
    noData:{
        fontFamily: 'Nunito',
        fontSize: '25px',
        minHeight: '90vh',
        display: 'grid',
        placeSelf: 'center',
        placeItems:'center'
    },
    fieldHolder:{
        display: 'flex',
        justifyContent:'space-between',
        width: '100%',
        margin: '7px 0px 7px 0px'
    },
    selectField:{
        width: '45%'
    },
    leadDetails:{
        fontSize: '13px',
        fontFamily: 'Nunito'
    },
    course: {
        fontSize: '13px',
        fontFamily: 'Nunito'
    },
    btnSection:{
        display:'flex'
    },
    status:{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '13px',
        fontFamily: 'Nunito'
    },
    assigned:{
        fontSize: '13px',
        fontFamily: 'Nunito'
    },
    iconHolder: {
        width: '100%',
        minHeight: '150px',
        display: 'grid',
        placeItems: 'center'
    },
    btnWalkIn:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: '15px'
    },
    TypoCourse: {
        fontFamily: 'Nunito',
        fontSize: '15px',
        marginBottom: '10px',
        fontWeight: '600'
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddLeads(){
    const userData = decodeSessionStorage().payload;

    const classes = useStyles();
    const toast = useToast();
    const toast_course = "toast_course"; 
    const arr_category = ["Date", "", "Status", "Course", "CreatedBy", "AssignedTo"];
    const hot_array = ["RAW", "RAW(Re-applied)", "NI/Dead", "Decline", "PRSONA"];

    const [open, setOpen] = useState(false);
    const [typeOfDialog, setTypeOfDialog] = useState("");
    const [tableData, setTableData] = useState([]);
    const [update, setUpdate] = useState(false);

    const [coursesFetched, setCoursesFetched] = useState([]);
    const [statusFetched, setStatusFetched] = useState([]);
    const [commentsFetched, setCommentsFetched] = useState([]);
    const [employeeFetched, setEmployeesFetched] = useState([]);
    const [sourceFetched, setSourcesFetched] = useState([]);
    const [adNameFetched, setAdNameFetched] = useState([]);

    const [name, setName] = useState("");
    const [email_lead, setEmailLead] = useState("");
    const [mobile, setMobile] = useState("");
    const [city, setCity] = useState("");
    const [qualif, setQualif] = useState("");
    const [source, setSource] = useState("");
    const [course, setCourse] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [ad_name, setAdName] = useState("");
    const [otherComment, setOtherComment] = useState("");
    const [dob, setDob] = useState("");
    const [hot, setHot] = useState(false);

    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [searchValueStatus, setSearchStatus] = useState("");
    const [searchValueCourse, setSearchCourse] = useState("");
    const [searchValueCreated, setSearchCreated] = useState("");
    const [searchValueAssigned, setSearchAssigned] = useState("");

    const [openLoading, setOpenLoading] = useState(false);
    const [typeLoading, setTypeLoading] = useState("");
    const [dialogData, setDialogData] = useState({});

    const [searchCount, setSearchCount] = useState(0);

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleChangeValue = (e, type) => {
        switch (type) {
            case 1:
                setSearchStatus(e.target.value)
                break;
            case 2:
                setSearchCourse(e.target.value)
                break;
            case 3:
                setSearchCreated(e.target.value)
                break;
            case 4:
                setSearchAssigned(e.target.value)
                break;
            default:
                break;
        }
    }

    const handleOpen = (type, element) => {
        setOpen(true);
        setTypeOfDialog(type);

        if(element){
            setDialogData(element);
        }
    }
    const handleClose = () => {
        setOpen(false);
        setTypeOfDialog("");
    }

    const handleChange = (e, type) => {
        switch (type) {
            case 1:
                setQualif(e.target.value)
                break;
            case 2:
                setSource(e.target.value)
                break;
            case 3:
                setCourse(e.target.value)
                break;
            case 4:
                setStatus(e.target.value)
                break;
            case 5:
                setAssignTo(e.target.value)
                break;
            case 6:
                setComment(e.target.value);
                break;
            case 7:
                setAdName(e.target.value);
                break;
            case 8:
                setOtherComment(e.target.value);
                break;
            default:
                break;
        }
    }

    const handleNewLead = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_LEADS}/addNewLeads`, {
            email: userData.Email,
            name, email_lead, mobile, qualif, city, source, course, assignTo, status, comment, commentName: userData.Firstname + " " + userData.Surname,  ad_name, otherComment, hot, dob
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Error in creating new lead",
                    position: "top-right",
                    duration: 3000
                })
            }
        })
    }

    const handleCancel = () => {
        handleClose(1);
        setEmailLead("");
        setName("");
        setCity("");
        setMobile("");
        setQualif("");
        setComment("");
        setStatus("");
        setSource("");
        setAssignTo("");
        setCourse("");
    }

    const handleSearch = (e, pageId) => {
        if(e){
            e.preventDefault();
        }
        handleClose();
        setTypeLoading("search");
        setOpenLoading(true);

        var checksOut = false;
        var sentValue = "";

        switch (category) {
            case "Date":
                if(startDate === "" || endDate === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                }
                break;
            case "Name":
                if(searchValue === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValue;
                }
                break;
            case "Email":
                if(searchValue === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValue;
                }
                break;
            case "Mobile":
                if(searchValue === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValue;
                }
                break;
            case "Status":
                if(searchValueStatus === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValueStatus;
                }
                break;
            case "Course":
                if(searchValueCourse === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValueCourse;
                }
                break;
            case "CreatedBy":
                if(searchValueCreated === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValueCreated;
                }
                break;
            case "AssignedTo":
                if(searchValueAssigned === ""){
                    checksOut = false;
                } else {
                    checksOut = true;
                    sentValue = searchValueAssigned;
                }
                break;
            default:
                break;
        }

        if(checksOut === true){
            axios.post(`${process.env.REACT_APP_LEADS}/searchLeads`, {
                category, startDate, endDate, sentValue
            },{
                params: {
                    page: pageId
                }
            })
            .then((res) => {
                setSearchCount(res.data.queryCount);

                //changing the table data to display the fetched lead details.
                let data = [];
                res.data.queryResult.forEach((element) => {
                    data.push({
                        "details": 
                        <div className={classes.leadDetails} style={{cursor: "pointer"}} onClick={() => {handleOpen("leadDetails")}}>
                            {element.Name + " | " + element.Email + " | " + element.Mobile + " "}
                            {element.Hot === "1" ? <Chip style={{backgroundColor: '#202950', color: "white", fontFamily: 'Nunito'}} size="small" label="Hot Lead" /> : null }
                        </div>,
                    "course": 
                        <div className={classes.course}>
                            {element.course + " | " + element.courseType + " | Rs." + element.courseCost}
                        </div>,
                    "status": 
                        <div className={classes.status} style={{cursor: "pointer"}} onClick={() => handleOpen("leadStatus")}>
                            <div>{element.Status}</div>
                            <div>{new Date(element.UpdationDt).toLocaleString()}</div>
                        </div>,
                    "assignedTo": 
                        <div className={classes.assigned}>
                            <div>{element.assignF + " " + element.assignS}</div>
                            <div>{new Date(element.AssignDt).toLocaleString()}</div>
                        </div>,
                    "actions": <div className={classes.btnSection}>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white', marginRight: '5px'}} onClick={() => handleOpen("walkIn")}>
                                <FaWalking style={{margin: '5px'}} />    
                            </Button>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white', marginRight: '5px'}} onClick={() => handleOpen("mailPortal")}>
                                <FaMailBulk style={{margin:'5px'}} />
                            </Button>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white'}} onClick={() => handleOpen("bookDetails")}>
                                <FaBookmark style={{margin: '5px'}} />
                            </Button>
                        </div>
                    })
                })
                setTableData(data);
                setTimeout(() => {
                    setTypeLoading("");
                    setOpenLoading(false);
                }, 1000);
            })
            .catch((err) => {
                if(!toast.isActive(toast_course)){
                    toast({
                        id: toast_course,
                        description: "Error in searching leads",
                        position: "top",
                        duration: 3000
                    })
                }
            })
        } else {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Please provide the relevant information",
                    duration: 2000,
                    position: "top-right"
                })
            }
        }
    }

    const handleChangesDetails = (e) => {
        e.preventDefault();

        //changing the details of a particular lead.
        axios.post(`${process.env.REACT_APP_LEADS}/modifyDetails`,{
            id: dialogData.Lead_id, Name: dialogData.Name, Email: dialogData.Email, Mobile: dialogData.Mobile, DOB: dialogData.DOB, Qualif: dialogData.Qualif, City: dialogData.City
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Lead Details Update Failed",
                    position: "top-right",
                    duration: 3000
                })
            }
        })
    }

    const handleCourseSourceChange = (e) => {
        e.preventDefault();

        //change the course and the source of the lead only available to the national head.
        axios.post(`${process.env.REACT_APP_LEADS}/modifySourceCourse`, {
            id: dialogData.Lead_id, source: dialogData.Source, course: dialogData.courseId
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Update Execution Failed",
                    duration: 3000,
                    position: "top-right"
                })
            }
        })
    }

    const handleStatusUpdate = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_LEADS}/statusUpdate`,{
            Lead_id: dialogData.Lead_id,
            status: dialogData.Status,
            followUpDate: dialogData.followUpDate,
            followUpTime: dialogData.followUpTime,
            assignedTo: dialogData.AssignedTo,
            assignChange: dialogData.assignedChange,
            oldComment: dialogData.Comment,
            newcomment: dialogData.newcomment,
            newotherComment: dialogData.newotherComment,
            interviewDate: dialogData.interviewDate,
            interviewTime: dialogData.interviewTime,
            updatorId: userData.Employee_ID,
            venue: dialogData.Venue,
            commentName: userData.Firstname + " " + userData.Surname,
            hot: dialogData.Hot
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Status Update Failed",
                    duration: 3000,
                    position: "top-right"
                })
            }
        })
    }

    useEffect(() => {
        setTypeLoading("latestLeads");
        setOpenLoading(true);

        axios.post(`${process.env.REACT_APP_LEADS}/getLatestLeads`,{
            email: userData.Email
        })
        .then((res) => {
            let data_latest = [];

            res.data.latest.forEach((element) => {
                data_latest.push({
                    "details": 
                        <div className={classes.leadDetails} style={{cursor: "pointer"}} onClick={() => handleOpen("leadDetails", element)}>
                            {element.Name + " | " + element.Email + " | " + element.Mobile + " "}
                            {element.Hot === "1" ? <Chip style={{backgroundColor: '#202950', color: "white", fontFamily: 'Nunito'}} size="small" label="Hot Lead" /> : null }
                        </div>,
                    "course": 
                        <div className={classes.course} style={{cursor: 'pointer'}} onClick={userData.Type === "National Head" ? () => handleOpen("courseSource", element) : null}>
                            {element.course + " | " + element.courseType + " | Rs." + element.courseCost + " | " + element.Source}
                        </div>,
                    "status": 
                        <div className={classes.status} style={{cursor: "pointer"}} onClick={() => handleOpen("leadStatus", element)}>
                            <div>{element.Status}</div>
                            <div>{new Date(element.UpdationDt).toLocaleString()}</div>
                        </div>,
                    "assignedTo": 
                        <div className={classes.assigned}>
                            <div>{element.assignF + " " + element.assignS}</div>
                            <div>{new Date(element.AssignDt).toLocaleString()}</div>
                        </div>,
                    "actions": <div className={classes.btnSection}>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white', marginRight: '5px'}} onClick={() => handleOpen("walkIn")} disabled={element.Status !== "Confirmed"}>
                                <FaWalking style={{margin: '5px'}} />    
                            </Button>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white', marginRight: '5px'}} onClick={() => handleOpen("mailPortal")}>
                                <FaMailBulk style={{margin:'5px'}} />
                            </Button>
                            <Button variant="contained" style={{backgroundColor: '#202950', color: 'white'}} onClick={() => handleOpen("bookDetails")}>
                                <FaBookmark style={{margin: '5px'}} />
                            </Button>
                        </div>
                })
            })
            setTableData(data_latest);
            setTimeout(() => {
                setOpenLoading(false);
                setTypeLoading("");    
            }, 500);
            
        })
        .catch((err) =>{})
    }, [update, userData.Type, classes.btnSection, classes.assigned, classes.course, classes.leadDetails, classes.status, userData.Email])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getCourses`, {
            email: userData.Email
        })
        .then((res) => {
            setCoursesFetched(res.data.courses);
        })
        .catch(err => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching courses failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        axios.post(`${process.env.REACT_APP_CONFIG}/getStatus`, {
            email: userData.Email
        })
        .then((res) => {
            setStatusFetched(res.data.status);
        })
        .catch(err => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching status failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        axios.post(`${process.env.REACT_APP_CONFIG}/getSource`, {
            email: userData.Email
        })
        .then((res) => {
            setSourcesFetched(res.data.sources);
        })
        .catch(err => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching source failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        axios.post(`${process.env.REACT_APP_CONFIG}/getAds`,{
            email: userData.Email
        })
        .then((res) => {
            setAdNameFetched(res.data.ads);
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching Ads failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        axios.post(`${process.env.REACT_APP_CONFIG}/getComments`, {
            email: userData.Email
        })
        .then((res) => {
            setCommentsFetched(res.data.comments);
        })
        .catch(err => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching comments failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        axios.post(`${process.env.REACT_APP_USER}/getTeleCallerList`,{
            email: userData.Email
        })
        .then((res) => {
            setEmployeesFetched(res.data.employees);
        })
        .catch((err) => {
            if(!toast.isActive(toast_course)){
                toast({
                    id: toast_course,
                    description: "Fetching Employee List failed",
                    duration: 2000,
                    position: "top"
                })
            }
        })

    }, [toast, userData.Email])

    return(
        <>
        <Paper elevation={3} className={classes.containerLead}>
            <div className={classes.btnNewLead}>
                <Button style={{backgroundColor: '#202950', color: 'white', marginRight:'15px'}} variant="contained" onClick={() => handleOpen("searchLeads")}>
                    Search Leads
                </Button>
                <Button style={{backgroundColor: '#202950', color: 'white'}} variant="contained" onClick={() => handleOpen("addNewLead")}>
                    Add New Lead
                </Button>
            </div>
            <div className={classes.tableHolder}>
            {
                tableData.length > 0 ?
                <MaterialTable
                    title="Latest Leads Table"
                    columns={[
                        {title: 'Lead Details', field: "details", cellStyle: {textAlign: 'center', width: '25%'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Course | Source', field: "course", cellStyle: {textAlign: 'center', width: '25%'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Status', field: "status", cellStyle: {textAlign: 'center', width: '25%'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Assigned To', field: "assignedTo", cellStyle: {textAlign: 'center', width: '25%'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Actions', field: "actions", cellStyle: {textAlign: 'center', width: '25%'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}}
                    ]}
                    data={tableData}
                    style={{width: '98%', textAlign:'center'}}
                />
                :
                <div className={classes.noData}>
                    No leads to show
                </div>
            }
            </div>
            {
                searchCount < 40 ? //to be changed to accomdate correct rendering conditions for pagination
                    <Pagination 
                        style={{justifyContent: 'center', padding: '10px'}}
                        count={10} //section to count depending on the searchCount 
                        shape="rounded" 
                        size="large"
                        onChange={(e, page) => handleSearch(false , page)}
                    />
                :
                    null
            }
        </Paper>
        <Dialog open={open} fullWidth TransitionComponent={Transition} onClose={() => handleClose()} aria-labelledby={typeOfDialog}>
            {typeOfDialog === "addNewLead" ? 
                <DialogContent>
                <form onSubmit={handleNewLead}>
                    <TextField 
                        required
                        fullWidth
                        autoComplete="off"
                        name="name"
                        type="text"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        label="Name"
                        placeholder="Enter Lead's Name"
                        style={{marginBottom: '7px'}}
                    />
                    <div className={classes.fieldHolder}>
                        <TextField 
                            required
                            fullWidth
                            autoComplete="off"
                            name="email"
                            type="email"
                            label="Email"
                            placeholder="Enter Lead's Email"
                            value={email_lead}
                            onChange={e=>setEmailLead(e.target.value)}
                            style={{width: '45%'}}
                        />
                        <TextField 
                            fullWidth
                            autoComplete="off"
                            name="dob"
                            type="date"
                            label="DOB"
                            placeholder="Enter Lead's DOB"
                            value={dob}
                            onChange={e=>setDob(e.target.value)}
                            style={{width: '45%'}}
                        />
                    </div>
                    <div className={classes.fieldHolder}>
                        <TextField 
                            required
                            autoComplete="off"
                            type="text"
                            label="City"
                            placeholder="Enter City Name"
                            value={city}
                            onChange={e=>setCity(e.target.value)}
                            style={{width: '45%'}}
                        />
                        <TextField 
                            required
                            autoComplete="off"
                            type="tel"
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            value={mobile}
                            onChange={e=>setMobile(e.target.value)}
                            style={{width: '45%'}}
                        />
                    </div>
                    <div className={classes.fieldHolder}>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Sources</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={source}
                                onChange={(e)=>handleChange(e, 2)}
                            >
                            {
                                sourceFetched.map((element, index) => {
                                    return (
                                        <MenuItem key={index} value={element.name}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Qualification</InputLabel>
                            <Select
                                fullWidth
                                value={qualif}
                                onChange={(e) => handleChange(e, 1)}
                            >
                                <MenuItem value={"not_available"}>Not Available</MenuItem>
                                <MenuItem value={"10"}>10th</MenuItem>
                                <MenuItem value={"12"}>12th</MenuItem>
                                <MenuItem value={"grad"}>Graduation</MenuItem>
                                <MenuItem value={"postGrad"}>Post-graduation</MenuItem>
                                <MenuItem value={"MBA"}>MBA</MenuItem>
                                <MenuItem value={"iti_others"}>ITI/Others</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className={classes.fieldHolder}>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={status}
                                onChange={(e)=>handleChange(e, 4)}
                            >
                            {
                                statusFetched.map((element, index) => {
                                    return (
                                        <MenuItem key={index} value={element.name}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Courses Offered</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={course}
                                onChange={(e) => handleChange(e, 3)}
                            >
                            {
                                coursesFetched.map((element) => {
                                    return(
                                        <MenuItem key={element.id} value={element.id}>
                                            {element.name}{" "}{element.type}{" Rs. "}{element.Cost}  
                                        </MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                    </div>
                    <InputLabel style={{marginTop: '3px'}}>Assigned To</InputLabel>
                    <Select
                        required
                        fullWidth
                        value={assignTo}
                        onChange={(e)=>handleChange(e, 5)}
                    >
                    {
                        employeeFetched.map((element, index) => {
                            return (
                            <MenuItem key={index} value={element.Employee_ID}>{element.Firstname}{" "}{element.Surname}</MenuItem>
                            )
                        })
                    }
                    </Select>
                    <div className={classes.fieldHolder}>
                        <FormControl className={classes.selectField}>
                            <InputLabel>Ads Name</InputLabel>
                            <Select
                                required
                                value={ad_name}
                                fullWidth
                                onChange={(e) => handleChange(e, 7)}
                            >
                            {
                                adNameFetched.map((element) => {
                                    return (
                                        <MenuItem key={element.id} value={element.ad_name}>{element.ad_name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl className={classes.selectField}>
                            <InputLabel style={{marginTop: '3px'}}>Comments</InputLabel>
                            <Select
                                fullWidth
                                value={comment}
                                onChange={(e)=>handleChange(e, 6)}
                            >
                            {
                                commentsFetched.map((element, index) => {
                                    return (
                                    <MenuItem key={index} value={element.comment}>{element.comment}</MenuItem>
                                    )
                                })
                            }
                                <MenuItem value="others" > Others </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <TextField 
                        required={comment === "others" ? true : false}
                        fullWidth
                        autoComplete="off"
                        value={otherComment}
                        onChange={(e)=>handleChange(e, 8)}
                        style={{marginTop: '7px'}}
                        label="Comment"
                        placeholder="Additional Comment"
                        disabled={comment === "others" ? false : true}
                    />
                    <FormControl fullWidth>
                        <FormControlLabel
                            value="start"
                            control={<Checkbox checked={hot} onChange={e=>setHot(e.target.checked)} color="primary" />}
                            label="Checkbox for hot lead"
                            labelPlacement="end"
                        />
                    </FormControl>
                    <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px'}} variant="contained">
                        Add New Lead
                    </Button>
                    <Button style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px'}} variant="contained" onClick={handleCancel}>
                        Reset
                    </Button>
                </form>
            </DialogContent>
            : 
            typeOfDialog === "searchLeads" ?
                <>
                <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>Search Leads By Category</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => handleSearch(e, 1)}>
                        <FormControl fullWidth name="category">
                            <InputLabel>Select Search Category</InputLabel>
                            <Select
                                required
                                name="category"
                                value={category}
                                onChange={handleChangeCategory}
                            >
                                <MenuItem value="Date">Date</MenuItem>
                                <MenuItem value="Name">Name</MenuItem>
                                <MenuItem value="Email">Email</MenuItem>
                                <MenuItem value="Mobile">Mobile</MenuItem>
                                <MenuItem value="Status">Status</MenuItem>
                                <MenuItem value="Course">Course</MenuItem>
                                { userData.Type === "National Head" ? 
                                <>
                                    <MenuItem value="CreatedBy">Created By</MenuItem>
                                    <MenuItem value="AssignedTo">Assigned To</MenuItem>
                                </>
                                :
                                null
                                }
                            </Select>
                        </FormControl>
                        <div className={classes.fieldHolder} style={{display: category === "Date" ? 'flex' : 'none'}}>
                            <TextField 
                                type="date"
                                name="startDate"
                                label="Range Start Date"
                                value={startDate}
                                onChange={e=>setStartDate(e.target.value)}
                                style={{width: '45%'}}
                            />
                            <TextField 
                                type="date"
                                name="endDate"
                                label="Range End Date"
                                value={endDate}
                                onChange={e=>setEndDate(e.target.value)}
                                style={{width: '45%'}}
                            />
                        </div>
                        <TextField 
                            fullWidth
                            style={{display: !(arr_category.includes(category)) 
                                ? 'flex' : 'none', marginTop: '7px'}}
                            label={category}
                            placeholder={`Enter ${category}`}
                            value={searchValue}
                            name="searchValue"
                            onChange={e=>setSearchValue(e.target.value)} 
                        />
                        <FormControl name="searchStatus" style={{display: category === "Status" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                fullWidth
                                value={searchValueStatus}
                                onChange={(e) => handleChangeValue(e, 1)}
                                style={{width: '100%'}}
                            >
                            {
                                statusFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index} value={element.id}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl name="searchCourse" style={{display: category === "Course" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                fullWidth
                                value={searchValueCourse}
                                onChange={(e) => handleChangeValue(e, 2)}
                                style={{width: '100%'}}
                            >
                            {
                                coursesFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index} value={element.id}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl name="searchCreated" style={{display: category === "CreatedBy" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                fullWidth
                                value={searchValueCreated}
                                onChange={(e) => handleChangeValue(e, 3)}
                                style={{width: '100%'}}
                            >
                            {
                                employeeFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index} value={element.Employee_ID}>{element.Firstname+ " " +element.Surname}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl name="searchAssigned" style={{display: category === "AssignedTo" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                fullWidth
                                value={searchValueAssigned}
                                onChange={(e) => handleChangeValue(e, 4)}
                                style={{width: '100%'}}
                            >
                            {
                                employeeFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index} value={element.Employee_ID}>
                                            {element.Firstname+ " " +element.Surname}
                                        </MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <Button type="submit" style={{backgroundColor: '#202950', color: 'white', marginTop:'10px', marginRight:'5px'}} variant="contained">
                            Search
                        </Button>
                    </form>
                </DialogContent>
                </>
            :
            typeOfDialog === "leadDetails" ?
            <>
                <DialogTitle>Lead Details</DialogTitle>
                <DialogContent>
                    <Typography className={classes.TypoCourse}>
                        This dialog box can be used to change the personal and contact details of a lead.
                    </Typography>
                    <form onSubmit={handleChangesDetails}>
                        <TextField 
                            required
                            fullWidth
                            name="leadName"
                            type="text"
                            label="Lead Name"
                            placeholder="Change the lead name"
                            value={dialogData.Name}
                            onChange={e=>setDialogData({...dialogData, Name: e.target.value})}
                            style={{marginBottom: '7px'}}
                        />
                        <div className={classes.fieldHolder}>
                            <TextField 
                                required
                                autoComplete="off"
                                name="leadEmail"
                                label="Lead Email"
                                type="email"
                                placeholder="Change the lead email"
                                value={dialogData.Email}
                                onChange={e=>setDialogData({...dialogData, Email: e.target.value})}
                                style={{marginBottom: '7px', width: '45%'}}
                            />
                            <TextField 
                                required
                                autoComplete="off"
                                name="leadMobile"
                                label="Lead Mobile"
                                type="tel"
                                placeholder="Change the mobile number"
                                value={dialogData.Mobile}
                                onChange={e=>setDialogData({...dialogData, Mobile: e.target.value})}
                                style={{marginBottom: '7px', width: '45%'}}
                            />
                        </div>
                        <div className={classes.fieldHolder}>
                            <TextField 
                                required
                                autoComplete="off"
                                name="leadDOB"
                                type="date"
                                label="Lead DOB"
                                placeholder="Change the DOB"
                                value={dialogData.DOB ? new Date(new Date(dialogData.DOB).getTime() - (new Date(dialogData.DOB).getTimezoneOffset()*60000)).toISOString().split("T")[0] : null}
                                onChange={e=>setDialogData({...dialogData, DOB: e.target.value})}
                                style={{marginBottom: '7px', width: '45%'}}
                            />
                            <TextField 
                                required
                                autoComplete="off"
                                name="leadCity"
                                label="Lead City"
                                type="text"
                                placeholder="Change the city"
                                value={dialogData.City}
                                onChange={e=>setDialogData({...dialogData, City: e.target.value})}
                                style={{marginBottom: '7px', width: '45%'}}
                            />
                        </div>
                        <FormControl style={{marginBottom: '7px'}} fullWidth>
                            <InputLabel>Lead Qualification</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={dialogData.Qualif}
                                onChange={e => setDialogData({...dialogData, Qualif: e.target.value})}
                            >
                                <MenuItem value={"not_available"}>Not Available</MenuItem>
                                <MenuItem value={"10"}>10th</MenuItem>
                                <MenuItem value={"12"}>12th</MenuItem>
                                <MenuItem value={"grad"}>Graduation</MenuItem>
                                <MenuItem value={"postGrad"}>Post-graduation</MenuItem>
                                <MenuItem value={"MBA"}>MBA</MenuItem>
                                <MenuItem value={"iti_others"}>ITI/Others</MenuItem>
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{backgroundColor: '#202950', color: 'white', marginTop: '3px', width: '100%'}}
                        >
                            Change Details
                        </Button>
                    </form>
                </DialogContent>
            </>
            :
            typeOfDialog === "courseSource" ?
                <>
                    <DialogTitle>Change Course Or Status</DialogTitle>
                    <DialogContent>
                        <Typography className={classes.TypoCourse}>
                            The details changed through this form will be mapped to the lead. Please make sure that the changes are valid.
                        </Typography>
                        <form onSubmit={handleCourseSourceChange}>
                            <FormControl fullWidth style={{marginBottom: '7px'}}>
                                <InputLabel>Select New Course</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    value={dialogData.courseId}
                                    onChange={e=>setDialogData({...dialogData, courseId: e.target.value})}
                                >
                                {
                                    coursesFetched.map((element) => {
                                        return(
                                            <MenuItem key={element.id} value={element.id}>
                                                {element.name}{" "}{element.type}{" Rs. "}{element.Cost}  
                                            </MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{marginBottom: '7px'}}>
                                <InputLabel>Select New Source</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    value={dialogData.Source}
                                    onChange={e=>setDialogData({...dialogData, Source: e.target.value})}
                                >
                                {
                                    sourceFetched.map((element, index) => {
                                        return (
                                            <MenuItem key={index} value={element.name}>{element.name}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{backgroundColor: '#202950', color: 'white', marginTop: '3px', width: '100%'}}
                            >
                                Apply Changes
                            </Button>
                        </form>
                    </DialogContent>
                </>
            :
            typeOfDialog === "leadStatus" ?
                <>
                    <DialogTitle>Lead Status Update</DialogTitle>
                    <DialogContent>
                        <Typography className={classes.TypoCourse}>Please make sure to fill all the required details to update the status of a lead.</Typography>
                        <form onSubmit={handleStatusUpdate}>
                            <FormControl fullWidth style={{marginBottom: '4px'}}>
                                <InputLabel>Lead Status</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    value={dialogData.Status}
                                    onChange={e=>setDialogData({...dialogData, Status: e.target.value})}
                                >
                                {
                                    statusFetched.map((element, index) => {
                                        return (
                                            <MenuItem key={index} value={element.name}>{element.name}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
                            <div className={classes.fieldHolder} style={{display: dialogData.Status !== "Confirmed"? 'flex' : 'none'}}>
                                <TextField 
                                    required={dialogData.Status !== "Confirmed" ? true : false}
                                    style={{width: '45%'}}
                                    type="date"
                                    label="Follow-up Date"
                                    value={dialogData.followUpDate}
                                    onChange={e=>setDialogData({...dialogData, followUpDate: e.target.value})}
                                />
                                <TextField 
                                    required={dialogData.Status !== "Confirmed" ? true : false}
                                    style={{width: '45%'}}
                                    type="time"
                                    label="Follow-up Time"
                                    value={dialogData.followUpTime}
                                    onChange={e=>setDialogData({...dialogData, followUpTime: e.target.value})}
                                />
                            </div>
                            <div style={{display: dialogData.Status === "Confirmed" ? 'flex' : 'none', flexDirection: 'column', marginBottom: '7px'}}>
                                <div className={classes.fieldHolder} >
                                    <TextField 
                                        required={dialogData.Status === "Confirmed" ? true : false}
                                        style={{width: '45%'}}
                                        type="date"
                                        label="Interview Date"
                                        value={dialogData.interviewDate}
                                        onChange={e=>setDialogData({...dialogData, interviewDate: e.target.value})}
                                    />
                                    <TextField 
                                        required={dialogData.Status === "Confirmed" ? true : false}
                                        style={{width: '45%'}}
                                        type="time"
                                        label="Interview Time"
                                        value={dialogData.interviewTime}
                                        onChange={e=>setDialogData({...dialogData, interviewTime: e.target.value})}
                                    />
                                </div>
                                <TextField 
                                    required={dialogData.Status === "Confirmed" ? true : false}
                                    fullWidth
                                    type="text"
                                    label="Venue"
                                    placeholder="Enter the Venue"
                                    value={dialogData.Venue}
                                    onChange={e=>setDialogData({...dialogData, Venue: e.target.value})}
                                />
                            </div>
                            <FormControl fullWidth style={{marginBottom: '7px', display: userData.Type === "National Head" ? 'flex' : 'none' }} >
                                <InputLabel>Assigned To</InputLabel>
                                <Select
                                    required={userData.Type === "National Head" ? true : false}
                                    fullWidth
                                    value={dialogData.assignedChange ? dialogData.assignedChange : dialogData.AssignedTo}
                                    onChange={e=>setDialogData({...dialogData, assignedChange: e.target.value})}
                                >
                                {
                                    employeeFetched.map((element, index) => {
                                        return (
                                        <MenuItem key={index} value={element.Employee_ID}>{element.Firstname}{" "}{element.Surname}</MenuItem>
                                        )
                                    })
                                }
                                </Select>
                            </FormControl>
                            <FormControl fullWidth style={{marginBottom: '4px'}}>
                                <InputLabel>Comments (Select other to enter manually)</InputLabel>
                                <Select
                                    required
                                    fullWidth
                                    value={dialogData.newcomment ? dialogData.newcomment : ''}
                                    onChange={e=>setDialogData({...dialogData, newcomment: e.target.value})}
                                >
                                {
                                    commentsFetched.map((element, index) => {
                                        return (
                                        <MenuItem key={index} value={element.comment}>{element.comment}</MenuItem>
                                        )
                                    })
                                }
                                    <MenuItem value="others" > Others </MenuItem>
                                </Select>
                            </FormControl>
                            <TextField 
                                required
                                fullWidth
                                disabled={dialogData.newcomment === "others" ? false : true}
                                value={dialogData.newotherComment ? dialogData.newotherComment : ''}
                                onChange={e=>setDialogData({...dialogData, newotherComment: e.target.value})}
                                label="Other Comment"
                                placeholder="Type comments here..."
                                style={{marginBottom: '4px'}}
                            />
                            {dialogData.Comment ?
                                <div className={classes.commentHolder}>
                                {
                                    JSON.parse(dialogData.Comment).map((element, index) => {
                                        if(element[0] !== ""){
                                        return (
                                            <div className={classes.TypoCourse} key={index}>
                                                <Typography style={{verticalAlign: 'center', fontWeight: '600', fontSize: '15px', fontFamily: 'Nunito'}}>
                                                    {element[0]}
                                                </Typography>
                                                <Typography style={{verticalAlign: 'center', fontWeight: '500', fontSize: '13px'}}>
                                                    {element[1] + " | "}{new Date(new Date(element[2]).getTime() - new Date().getTimezoneOffset()*60*1000).toGMTString()}
                                                </Typography>
                                            </div>
                                        )
                                        }
                                    })
                                }
                                </div>
                                :
                                null
                            }
                            <FormControl fullWidth style={{display: hot_array.includes(dialogData.Status) ? 'none' : 'flex', marginBottom: '7px'}}>
                                <FormControlLabel
                                    value="start"
                                    control={<Checkbox checked={Number(dialogData.Hot) ? true : false} onChange={e=>setDialogData({...dialogData, Hot: e.target.checked})} color="primary" />}
                                    label="Checkbox for hot lead"
                                    labelPlacement="end"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{backgroundColor: '#202950', color: 'white', marginTop: '3px', width: '100%'}}
                            >
                                Update Lead Status
                            </Button>
                        </form>
                    </DialogContent>
                </>
            :
            typeOfDialog === "walkIn" ?
                <>
                <DialogTitle>Lead Mark Walk-in</DialogTitle>
                <DialogContent>
                    <div className={classes.markWalkIn}>
                        <div className={classes.iconHolder} >
                            <AiFillAlert style={{width: '70%', height: '70%'}}/>
                        </div>
                        <div className={classes.btnWalkIn}>
                            <Button variant="contained" 
                                fullWidth 
                                style={{backgroundColor: '#202950', color: 'white', marginRight: '25px'}}
                                onClick={() => handleClose(5)}
                            >
                                Cancel
                            </Button>
                            <Button variant="contained" fullWidth style={{backgroundColor: '#202950', color: 'white'}}>
                                Yeah! It's a walk-in
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </>
            :
            typeOfDialog === "mailPortal" ?
                <DialogTitle>Lead Message Portal</DialogTitle>
            :
            typeOfDialog === "bookDetails" ?
                <DialogTitle>Book now with details</DialogTitle>
            :    
            null
            }
        </Dialog>
        <Loading open={openLoading} setOpenLoading={setOpenLoading} type={typeLoading} />
        </>
    )
}

export default AddLeads;