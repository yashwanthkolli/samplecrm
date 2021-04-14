import React, { useEffect, useState } from 'react';
import { makeStyles }  from '@material-ui/core/styles';
import { useToast } from '@chakra-ui/react';
import MaterialTable from 'material-table';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {
    Section
} from './addUserComponents';

const useStyles = makeStyles((theme) => ({
    useTable: {
        padding: theme.spacing(0)
    },
    userButton: {
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        color: 'white',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

function AddUsers(){

    const classes = useStyles();

    const toast = useToast();
    const [tableData, setTableData] = useState([]);

    const lid = "list-toast";

    const adduser = (e) => {
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_USER}/addUser`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
        })
        .catch((err) => {
            
        })
    }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/usersList`,{
            email: JSON.parse(localStorage.getItem('user')).Email
        })
        .then((res) => {
            let data = [];

            res.data.details.forEach((element) => {
                data.push({
                    "Name" : element.Firstname.trim() + " " + element.Surname.trim(),
                    "Email": element.Email,
                    "Mobile": element.Mobile,
                    "City": element.City,
                    "Type": element.Type,
                    "Reporting": element.Reporting
                })
            })
            setTableData(data);
        })
        .catch((err) => {
            if(!toast.isActive(lid)){
                toast({
                    id: lid,
                    description: "Error in fetching users list",
                    duration: 2000,
                    position: "top"
                })
            }
        })
    }, [toast])

    return (
        <Paper elevation={3} style={{width: "100%", height: "95%"}} className={classes.userTable}>
            {
                tableData.length > 0 ?
                    <MaterialTable
                        columns={[
                            {title: 'Name', field: 'Name'},
                            {title: 'Email', field: 'Email'},
                            {title: 'Mobile', field: 'Mobile'},
                            {title: 'City', field: 'City'},
                            {title: 'Role', field: 'Type'},
                            {title: 'Reporting To', field: 'Reporting'}
                        ]}
                        data={tableData}
                        title="CRM User List"
                    />
                :
                    <Section>
                        No users in the database.
                    </Section>
            }
            <div className={classes.userButton}>
                <Button style={{backgroundColor: "#202950", color: 'white', padding: '7px 10px'}}>Add New User</Button>
            </div>
        </Paper>
    )
}

export default AddUsers;