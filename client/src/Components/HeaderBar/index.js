import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { ImProfile } from 'react-icons/im';
import { BsFillChatSquareDotsFill } from 'react-icons/bs';
import { IoMdLogOut } from 'react-icons/io';
import { GrResources } from 'react-icons/gr';
import { BiCarousel, BiChalkboard, BiCommentDetail ,BiStation, BiMenuAltLeft} from 'react-icons/bi';
import { AiFillHome, AiOutlineFileAdd } from 'react-icons/ai';
import {HiOutlineOfficeBuilding} from 'react-icons/hi';

import { MdFeedback, MdUpdate } from 'react-icons/md';
import { GiProgression } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { signout } from '../../helpers/auth.helpers';
import { FaUserEdit, FaUsers, FaAddressCard ,FaCashRegister } from 'react-icons/fa';
import { HiUserAdd } from 'react-icons/hi';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import { decodeSessionStorage } from '../../helpers/auth.helpers';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: '#E0E0F8'
    },
    appBar: {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
  hide: {
    display: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginTop: '60px',
    padding: theme.spacing(3),
    backgroundColor: '#E0E0F8',
    height: 'fit-content'
  },
  navbarSpace: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '20px'
  },
  iconCenter: {
    display: 'flex',
    paddingLeft: theme.spacing(1)
  },
  listStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'space-around',
    minHeight: '65%',
  },
  list: {
    width: 225,
  },
  fullList: {
    width: 'auto',
  },
  profile: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    flexDirection: 'column'
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  profileDetails: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: '16px',
    marginTop: '3px'
  },
  container:{
    position: 'relative',
    width: '100%',
    height: '100%'
  }
}))

function HeaderBar({match}){

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    }
    const userData = decodeSessionStorage().payload;

    const adminNav = [
        {id: 1 ,path: `${match.path}/profile`, text: 'Profile',  icon: ImProfile },
        {id: 2 ,path: `${match.path}/home`, text: 'Home',  icon: AiFillHome },
        {id: 4 ,path: `${match.path}/offices`, text: 'Offices',  icon: HiOutlineOfficeBuilding },
        {id: 5 ,path: `${match.path}/addAdmin`, text: 'Add Admin',  icon: HiUserAdd },
        {id: 5 ,path: `${match.path}/addSupervisor`, text: 'Add Supervisor',  icon: FaUsers },
        {id: 6 ,path: `${match.path}/viewRegisters`, text: 'Registers', icon:FaCashRegister },
        {id: 7 ,path: `${match.path}/addRegisters`, text: 'Add Registers', icon:AiOutlineFileAdd },
       
    ]

    const supervisorNav = [
      {id: 6, path: `${match.path}/home`, icon: AiFillHome, text: 'Home'},
      {id: 1, path: `${match.path}/supervisor/profile`,  icon: ImProfile, text: 'Your Profile' },
      {id: 2, path: `${match.path}/supervisor/StaffUsers`,  icon: BiCarousel, text: 'Users' },
      {id: 3, path: `${match.path}/supervisor/AddStaff`,  icon: MdUpdate, text: 'Add Users' },
      
    ]

    const staffNav = [
      {id: 1, path: `${match.path}/staff/home`, text: 'Dashboard', icon: AiFillHome},
      {id: 2, path: `${match.path}/staff/profile`, text: 'Your Profile', icon: FaAddressCard },
      {id: 3, path: `${match.path}/staff/registers`, text: 'Registers', icon: FaCashRegister }
    ]

    let navbarElements;

    switch(userData.role){
      case 'Admin':
        navbarElements = adminNav
        break;
      case 'Staff':
        navbarElements = staffNav
        break;
      case 'Supervisor':
        navbarElements = supervisorNav
        break;
      default:
        break;
    }

    const list = () => (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <List className={classes.listStyle}>
            {navbarElements.map((element) => (
                <Link to={element.path} key={element.id}>
                <ListItem button >
                    <ListItemIcon className={classes.iconCenter}>
                    <Icon component={element.icon} />
                    </ListItemIcon>
                    <ListItemText primary={element.text} style={{
                    fontFamily: 'Roboto !important',
                    fontSize: '16px !important',
                    display: 'flex',
                    alignItems:'center',
                    justifyContent: 'center'
                    }}/>
                    
                </ListItem>
                </Link>
            ))}
            </List>
            <Divider />
        </div>
    );

    return (
        <div className = {classes.root}>
        <CssBaseline />
        <AppBar className = {classes.appBar} style={{backgroundColor: "#434389"}}>
            <Toolbar>
            {
              userData.role !== 'Staff' ?
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  edge="start"
              >
                  <MenuIcon />
              </IconButton> 
              : null
            }
            <div className={classes.navbarSpace}>
                <Typography variant="h6" noWrap style={{fontFamily: "'Roboto', sans-serif"}}>
                 INDIAN RAILWAYS
                </Typography>
                <Link to="/">
                <IconButton
                color="inherit"
                aria-label="Logout"
                onClick={signout}
                edge="end"
                >

                    <IoMdLogOut style={{fontSize: '32px'}} />
                
                </IconButton>
                </Link>
            </div>
            </Toolbar>
        </AppBar>
        <div>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <div className={classes.toolbar}>
          <Icon component={BiMenuAltLeft} />
          <Typography variant="h6" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </div>
        <Divider />
        <div className={classes.profile}>
          <Avatar className={classes.large} />
          <Typography noWrap className={classes.profileDetails}>
            {userData.firstname + " " + userData.lastname}
          </Typography>
          <Typography noWrap className={classes.profileDetails}>
            {userData.Email}
          </Typography>
        </div>
        <Divider />
        {list("left")}
      </SwipeableDrawer>
    </div>
    </div>
    )
}

export default HeaderBar;