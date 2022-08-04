import React from 'react';
import './styles.css'
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import { BsExclamationSquareFill } from 'react-icons/bs';

function Home(){
    const userData = decodeSessionStorage().payload;

    if(userData.role === "Admin"){
        return(
            <div className="main-page">
                <div style={{background: '#E0E0F8', display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
                    <div className='home-page'>
                        You have successfully Logged In as Admin!
                    </div>
                </div>
            </div>
        )
    }
    else if(userData.role === "Staff"){
        return(
            <div style={{background: '#E0E0F8', display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
                <div className='home-page'>
                    You have successfully Logged In as Staff!
                </div>
            </div>
        )
    }
    else if(userData.role === "Supervisor"){
        return(
            <div style={{background: '#E0E0F8', display: 'flex', justifyContent: 'center', padding: '50px 0'}}>
                <div className='home-page'>
                    You have successfully Logged In as Supervisor!
                </div>
            </div>
        )
    }
    else{
        <></>
    }

}

export default Home;