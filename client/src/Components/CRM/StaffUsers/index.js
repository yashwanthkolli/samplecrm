import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PRS from './prs';
import UTS from './uts';
import PO from './po';
const useStyles = makeStyles({
  root: {
    width: "90%",
    display: "flex",
    justifyContent: "space-around",
   
    
  },
});






function StaffUsers() {
    const classes = useStyles();
  
    const [office, setOffice] =useState(0);
    // 0===>PRS
    //1===>PO
    //2===>UTS
    let oname = 0;
    if(office === 0){
        oname="PRS"
    }else if(office === 1){
        oname="PO"
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
        <BottomNavigationAction label="PRS" icon={<RestoreIcon />} />
        <BottomNavigationAction label="PO" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="UTS" icon={<LocationOnIcon />} />
        </BottomNavigation>
        
        { oname==="PRS" ? <PRS oname={oname}  /> : <></>  }
        { oname==="PO" ? <PO oname={oname} /> : <></>    }
        { oname==="UTS" ? <UTS oname={oname} /> : <></> }

    </>
  )
}

export default StaffUsers;