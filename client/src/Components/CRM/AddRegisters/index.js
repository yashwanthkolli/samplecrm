import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import BookIcon from '@mui/icons-material/Book';
import PRS from './prs';
import UTS from './uts';

const useStyles = makeStyles({
  root: {
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
   
    
  },
});


function AddRegisters() {
    const classes = useStyles();
  
    const [office, setOffice] =useState(0);
    // 0===>PRS
    //1===>UTS
    let oname = 0;
    if(office === 0){
        oname="PRS"
    }else {
        oname="UTS"
    }
  
      console.log(oname);
    return (
      <>
          <BottomNavigation
          value={office}
          onChange={(event, newValue) => {
              setOffice(newValue);
          }}
          showLabels
          className={classes.root}
          >
          <BottomNavigationAction label="PRS" icon={<SplitscreenIcon />} />
          <BottomNavigationAction label="UTS" icon={<BookIcon />} />
          </BottomNavigation>
          
          { oname==="PRS" ? <PRS oname={oname}  /> : <></>  }
          
          { oname==="UTS" ? <UTS oname={oname} /> : <></> }
  
      </>
    )
 
}

export default AddRegisters;

