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
import {ImProfile} from 'react-icons/im';
import {BsFillChatSquareDotsFill} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import {BiCarousel, BiChalkboard, BiCommentDetail} from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import {MdEventNote, MdFeedback, MdUpdate} from 'react-icons/md';
import { SiGoogleanalytics } from 'react-icons/si';
import {Link} from 'react-router-dom';
import { signout } from '../../helpers/auth.helpers';
import { FaUserEdit, FaUserFriends } from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';

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
    fontFamily: 'Nunito',
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
    fontFamily: 'Nunito',
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

    const adminNav = [
        {id: 1 ,path: `${match.path}/profile`, text: 'Profile',  icon: ImProfile },
        {id: 2 ,path: `${match.path}/courses`, text: 'Courses',  icon: BiChalkboard },
        {id: 3 ,path: `${match.path}/ads`, text: 'Ads',  icon: BiCarousel },
        {id: 4 ,path: `${match.path}/comments`, text: 'Comments', icon: BiCommentDetail },
        {id: 5 ,path: `${match.path}/status`, text: 'Status', icon: TiTick },
        {id: 6 ,path: `${match.path}/updateAdmin`, text: 'Edit Profile', icon: FaUserEdit }
    ]

    const teamNav = [
        {id: 1, path: `${match.path}/profile`,  icon: ImProfile },
        {id: 2, path: `${match.path}/userTeam`,  icon: FaUserFriends },
        {id: 3, path: `${match.path}/eventTeam`,  icon: MdEventNote },
        {id: 4, path: `${match.path}/updateTeam`,  icon: MdUpdate },
        {id: 5, path: `${match.path}/permission`, icon: TiTick }
    ]

    const userNav = [
        {id: 6, path: `${match.path}/home`, icon: AiFillHome, text: 'Home'},
        {id: 1, path: `${match.path}/profile`,  icon: ImProfile, text: 'Your Profile' },
        {id: 2, path: `${match.path}/addLeads`,  icon: BiCarousel, text: 'Add Leads' },
        {id: 3, path: `${match.path}/addUsers`,  icon: MdUpdate, text: 'Add Users' },
        {id: 4, path: `${match.path}/contact`,  icon: BsFillChatSquareDotsFill, text: 'Profile' },
        {id: 5, path: `${match.path}/feedback`,  icon: MdFeedback, text: 'Profile' }
    ]

    let navbarElements;

    switch(JSON.parse(localStorage.getItem('user')).Type){
      case 'admin':
        navbarElements = adminNav
        break;
      case 'nationalHead':
        navbarElements = teamNav
        break;
      case 'national_head':
        navbarElements = userNav
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
                    fontFamily: 'Nunito !important',
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
        <AppBar className = {classes.appBar} style={{backgroundColor: "#202950"}}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                edge="start"
            >
                <MenuIcon />
            </IconButton>
            <div className={classes.navbarSpace}>
                <Typography variant="h6" noWrap style={{fontFamily: 'Nunito'}}>
                ICE CRM
                </Typography>
                <IconButton
                color="inherit"
                aria-label="Logout"
                onClick={signout}
                edge="end"
                >
                <Link to="/">
                    <FiLogOut />
                </Link>
                </IconButton>
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
          <Icon component={SiGoogleanalytics} />
          <Typography variant="h6" noWrap className={classes.title}>
            Dashboard
          </Typography>
        </div>
        <Divider />
        <div className={classes.profile}>
          <Avatar className={classes.large} />
          <Typography noWrap className={classes.profileDetails}>
            {JSON.parse(localStorage.getItem('user')).Firstname + " " + JSON.parse(localStorage.getItem('user')).Surname}
          </Typography>
          <Typography noWrap className={classes.profileDetails}>
            {JSON.parse(localStorage.getItem('user')).Email}
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