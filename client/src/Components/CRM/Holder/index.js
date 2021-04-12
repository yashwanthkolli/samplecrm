import React from 'react';
import {ImProfile} from 'react-icons/im';
import {BsFillChatSquareDotsFill} from 'react-icons/bs';
import {BiCarousel} from 'react-icons/bi';
import {MdEventNote, MdFeedback, MdUpdate} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { isAuth } from '../../../helpers/auth.helpers';
import { FaUserEdit, FaUserFriends } from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Holder({url, navigate}){

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const adminNav = [
        {id: 1 ,path: `${url}/profile`,  icon: ImProfile },
        {id: 2 ,path: `${url}/userAdmin`,  icon: FaUserEdit },
        {id: 4 ,path: `${url}/eventAdmin`,  icon: BiCarousel },
        {id: 5 ,path: `${url}/updateAdmin`,  icon: MdUpdate },
        {id: 6 ,path: `${url}/approval`,  icon: TiTick }
    ]

    const teamNav = [
        {id: 1, path: `${url}/profile`,  icon: ImProfile },
        {id: 2, path: `${url}/userTeam`,  icon: FaUserFriends },
        {id: 3, path: `${url}/eventTeam`,  icon: MdEventNote },
        {id: 4, path: `${url}/updateTeam`,  icon: MdUpdate },
        {id: 5, path: `${url}/permission`, icon: TiTick }
    ]

    const userNav = [
        {id: 1, path: `${url}/profile`,  icon: ImProfile },
        {id: 2, path: `${url}/events`,  icon: BiCarousel },
        {id: 3, path: `${url}/updates`,  icon: MdUpdate },
        {id: 4, path: `${url}/contact`,  icon: BsFillChatSquareDotsFill },
        {id: 5, path: `${url}/feedback`,  icon: MdFeedback }
    ]

    let navbarElements;

    switch(JSON.parse(localStorage.getItem('user')).Type){
        case 'admin':
          navbarElements = adminNav
          break;
        case 'nationalHead':
          navbarElements = teamNav
          break;
        case 'ACCTS':
          navbarElements = userNav
          break;
        default:
          break;
    }
    return(
        <div className = {classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  ICE Institute CRM
                </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
              variant="permanent"
              className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
              })}
              classes={{
              paper: clsx({
                  [classes.drawerOpen]: open,
                  [classes.drawerClose]: !open,
              }),
              }}
            >
              <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <BsFillChatSquareDotsFill /> : <BsFillChatSquareDotsFill />}
              </IconButton>
              </div>
              <Divider />
              <List>
              {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <BsFillChatSquareDotsFill /> : <BsFillChatSquareDotsFill />}</ListItemIcon>
                  <ListItemText primary={text} />
                  </ListItem>
              ))}
              </List>
              <Divider />
              <List>
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                  <ListItemIcon>{index % 2 === 0 ? <BsFillChatSquareDotsFill /> : <BsFillChatSquareDotsFill />}</ListItemIcon>
                  <ListItemText primary={text} />
                  </ListItem>
              ))}
              </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar}>
                  {navigate()}
                </div>
            </main>
        </div>
    )
}

export default Holder;