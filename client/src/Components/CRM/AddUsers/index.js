import React, { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import MaterialTable from 'material-table';

function AddUsers(){

    const toast = useToast();
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_USER}/addUsers`,{
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