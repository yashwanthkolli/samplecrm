import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import MaterialTable from 'material-table';

function AddUsers(){

    const toast = useToast();
    const [tableData, setTableData] = useState([]);

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
        })
        .catch((err) => {})
    })

    return (
        <>

        </>
    )
}

export default AddUsers;