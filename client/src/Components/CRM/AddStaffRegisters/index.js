import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import BookIcon from '@mui/icons-material/Book';
import { decodeSessionStorage } from '../../../helpers/auth.helpers';
import PRS from './prs';
import UTS from './uts';

const useStyles = makeStyles({
  root: {
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
   
    
  },
});


function StaffAddRegisters() {
    const classes = useStyles();
  
    const userData = decodeSessionStorage().payload;
    const oname=userData.oname;
    // 0===>PRS
    //1===>UTS
  console.log(userData)

    return (
      <>
          
          
          { oname==="PRS" ? <PRS  /> : <></>  }
          
          { oname==="UTS" ? <UTS  /> : <></> }
  
      </>
    )
 
}

export default StaffAddRegisters;