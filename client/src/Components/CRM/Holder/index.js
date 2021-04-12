import React from 'react';
import {ImProfile} from 'react-icons/im';
import {BsFillChatSquareDotsFill} from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import {BiCarousel} from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import {MdEventNote, MdFeedback, MdUpdate} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { signout } from '../../../helpers/auth.helpers';
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
import { Icon } from '@material-ui/core';

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
  navbarSpace: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

function Holder({match, navigate}){

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
      {id: 1 ,path: `${match.path}/profile`,  icon: ImProfile },
      {id: 2 ,path: `${match.path}/userAdmin`,  icon: FaUserEdit },
      {id: 4 ,path: `${match.path}/eventAdmin`,  icon: BiCarousel },
      {id: 5 ,path: `${match.path}/updateAdmin`,  icon: MdUpdate },
      {id: 6 ,path: `${match.path}/approval`,  icon: TiTick }
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
      {id: 1, path: `${match.path}/profile`,  icon: ImProfile, text: 'Profile' },
      {id: 2, path: `${match.path}/events`,  icon: BiCarousel, text: 'Profile' },
      {id: 3, path: `${match.path}/updates`,  icon: MdUpdate, text: 'Profile' },
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
                <div className={classes.navbarSpace}>
                  <Typography variant="h6" noWrap>
                    ICE Institute CRM
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
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
              {navbarElements.map((element) => (
                <Link to={element.path} key={element.id}>
                  <ListItem button>
                  <ListItemIcon>
                    <Icon component={element.icon} />
                  </ListItemIcon>
                  <ListItemText primary={element.text} />
                  </ListItem>
                </Link>
              ))}
              </List>
              <Divider />
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