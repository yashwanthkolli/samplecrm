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
import {FaWalking, FaMailBulk, FaBookmark} from 'react-icons/fa';
import { AiFillAlert } from 'react-icons/ai';

const useStyles = makeStyles((theme) => ({
    containerLead: {
        display: 'flex',
        width: '100%',
        height: '95%',
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
        fontSize: '25px'
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
        fontSize: '15px',
        fontFamily: 'Nunito'
    },
    course: {
        fontSize: '15px',
        fontFamily: 'Nunito'
    },
    btnSection:{
        display:'flex'
    },
    status:{
        display: 'flex',
        flexDirection: 'column',
        fontSize: '15px',
        fontFamily: 'Nunito'
    },
    assigned:{
        fontSize: '15px',
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
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function AddLeads(){

    const classes = useStyles();
    const toast = useToast();
    const toast_course = "toast_course"; 
    const arr_category = ["Date", "", "Status", "Course", "CreatedBy", "AssignedTo"];

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

    const [category, setCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchValue, setSearchValue] = useState("");

    const handleChangeCategory = (e) => {
        setCategory(e.target.value);
    }
    const handleChangeValue = (e) => {
        setSearchValue(e.target.value);
    }

    const handleOpen = (type) => {
        setOpen(true);
        setTypeOfDialog(type);
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

    const turnToPage = (pageId) => {

        axios.post(`${process.env.REACT_APP_LEADS}/getLatestLeads`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email
        },{
            params: {
                page: pageId
            }
        })
        .then((res) => {
            res.data.content.forEach((element) => {
            })
        })
        .catch(err => {
            toast({
                description: "Error In Fetching Leads",
                duration: 2000,
                position: "top"
            })
        })
    }

    const handleNewLead = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_LEADS}/addNewLeads`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email,
            name, email_lead, mobile, qualif, city, source, course, assignTo, status, comment, ad_name, otherComment
        })
        .then((res) => {
            setUpdate(!update);
            handleClose();
        })
        .catch((err) => {
            toast({
                description: "Error in creating new lead",
                position: "top",
                duration: 3000
            })
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

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_LEADS}/getLatestLeads`,{
            email: JSON.parse(sessionStorage.getItem('user')).Email
        })
        .then((res) => {
            let data_latest = [];

            res.data.latest.forEach((element) => {
                data_latest.push({
                    "details": 
                        <div className={classes.leadDetails} style={{cursor: "pointer"}} onClick={() => handleOpen("leadDetails")}>
                            {element.Name + " | " + element.Email + " | " + element.Mobile}
                        </div>,
                    "course": 
                        <div className={classes.course} >
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
            setTableData(data_latest);
        })
        .catch((err) =>{})
    }, [update, classes.btnSection, classes.assigned, classes.course, classes.leadDetails, classes.status])

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_CONFIG}/getCourses`, {
            email: JSON.parse(sessionStorage.getItem('user')).Email
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
            email: JSON.parse(sessionStorage.getItem('user')).Email
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
            email: JSON.parse(sessionStorage.getItem('user')).Email
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
            email: JSON.parse(sessionStorage.getItem('user')).Email
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
            email: JSON.parse(sessionStorage.getItem('user')).Email
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
            email: JSON.parse(sessionStorage.getItem('user')).Email
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

    }, [toast])

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
                        {title: 'Lead Details', field: "details", cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Course', field: "course", cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Status', field: "status", cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Assigned To', field: "assignedTo", cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}},
                        {title: 'Actions', field: "actions", cellStyle: {textAlign: 'center'}, headerStyle: {textAlign: 'center', fontSize: '16px', fontFamily: 'Nunito', fontWeight:'700'}}
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
                        style={{marginBottom: '7px'}}
                    />
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
                                required
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
                                required
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
                        fullWidth
                        autoComplete="off"
                        value={otherComment}
                        onChange={(e)=>handleChange(e, 8)}
                        style={{marginTop: '7px'}}
                        label="Comment"
                        placeholder="Additional Comment"
                        disabled={comment === "others" ? false : true}
                    />
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
                    <form>
                        <FormControl fullWidth>
                            <InputLabel>Select Search Category</InputLabel>
                            <Select
                                required
                                value={category}
                                onChange={handleChangeCategory}
                            >
                                <MenuItem value="Date">Date</MenuItem>
                                <MenuItem value="Name">Name</MenuItem>
                                <MenuItem value="Email">Email</MenuItem>
                                <MenuItem value="Mobile">Mobile</MenuItem>
                                <MenuItem value="Status">Status</MenuItem>
                                <MenuItem value="Course">Course</MenuItem>
                                <MenuItem value="CreatedBy">Created By</MenuItem>
                                <MenuItem value="AssignedTo">Assigned To</MenuItem>
                            </Select>
                        </FormControl>
                        <div className={classes.fieldHolder} style={{display: category === "Date" ? 'flex' : 'none'}}>
                            <TextField 
                                required
                                type="date"
                                label="Range Start Date"
                                value={startDate}
                                onChange={e=>setStartDate(e.target.value)}
                                style={{width: '45%'}}
                            />
                            <TextField 
                                required
                                type="date"
                                label="Range End Date"
                                value={endDate}
                                onChange={e=>setEndDate(e.target.value)}
                                style={{width: '45%'}}
                            />
                        </div>
                        <TextField 
                            required
                            fullWidth
                            style={{display: !(arr_category.includes(category)) 
                                ? 'flex' : 'none', marginTop: '7px'}}
                            label={category}
                            placeholder={`Enter ${category}`}
                            value={searchValue}
                            onChange={e=>setSearchValue(e.target.value)} 
                        />
                        <FormControl style={{display: category === "Status" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={searchValue}
                                onChange={handleChangeValue}
                                style={{width: '100%'}}
                            >
                            {
                                statusFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl style={{display: category === "Course" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={searchValue}
                                onChange={handleChangeValue}
                                style={{width: '100%'}}
                            >
                            {
                                coursesFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index}>{element.name}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl style={{display: category === "CreatedBy" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={searchValue}
                                onChange={handleChangeValue}
                                style={{width: '100%'}}
                            >
                            {
                                employeeFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index}>{element.Firstname+ " " +element.Surname}</MenuItem>
                                    )
                                })
                            }
                            </Select>
                        </FormControl>
                        <FormControl style={{display: category === "AssignedTo" ? 'flex' : 'none', width: '100%'}}> 
                            <InputLabel>{category}</InputLabel>
                            <Select
                                required
                                fullWidth
                                value={searchValue}
                                onChange={handleChangeValue}
                                style={{width: '100%'}}
                            >
                            {
                                employeeFetched.map((element, index) => {
                                    return(
                                        <MenuItem key={index} value={element.Firstname+ " " +element.Surname}>
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
                <DialogTitle>Lead Details</DialogTitle>
            :
            typeOfDialog === "leadStatus" ?
                <DialogTitle>Lead Status Update</DialogTitle>
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
        </>
    )
}

export default AddLeads;

//pagination to handle the data into different pages so that load balancing can be done.