import React from 'react';
import {Box, Stack, Center, Icon, Avatar, Tooltip} from '@chakra-ui/react';
import {ImProfile} from 'react-icons/im';
import {BsFillChatSquareDotsFill} from 'react-icons/bs';
import {BiCarousel} from 'react-icons/bi';
import {MdEventNote, MdFeedback, MdUpdate} from 'react-icons/md';
import {Link} from 'react-router-dom';
import { isAuth } from '../../helpers/auth';
import { FaUserEdit, FaUserFriends } from 'react-icons/fa';
import {TiTick} from 'react-icons/ti';

function Sidebar({url}){

    const adminNav = [
        {id: 1 ,path: `${url}/profileAdmin`,  icon: ImProfile, toolTip: 'Profile'},
        {id: 2 ,path: `${url}/userAdmin`,  icon: FaUserEdit, toolTip: 'User List'},
        {id: 4 ,path: `${url}/eventAdmin`,  icon: BiCarousel, toolTip: 'Events'},
        {id: 5 ,path: `${url}/updateAdmin`,  icon: MdUpdate, toolTip: 'Updates'},
        {id: 6 ,path: `${url}/approval`,  icon: TiTick, toolTip: 'Approvals'}
    ]

    const teamNav = [
        {id: 1, path: `${url}/profileTeam`,  icon: ImProfile, toolTip: 'Profile'},
        {id: 2, path: `${url}/userTeam`,  icon: FaUserFriends, toolTip: 'User List'},
        {id: 3, path: `${url}/eventTeam`,  icon: MdEventNote, toolTip: 'Events'},
        {id: 4, path: `${url}/updateTeam`,  icon: MdUpdate, toolTip: 'Updates'},
        {id: 5, path: `${url}/permission`, icon: TiTick, toolTip: 'Permissions'}
    ]

    const userNav = [
        {id: 1, path: `${url}/profile`,  icon: ImProfile, toolTip: 'Profile'},
        {id: 2, path: `${url}/events`,  icon: BiCarousel, toolTip: 'Events'},
        {id: 3, path: `${url}/updates`,  icon: MdUpdate, toolTip: 'Updates'},
        {id: 4, path: `${url}/contact`,  icon: BsFillChatSquareDotsFill, toolTip: 'Contact'},
        {id: 5, path: `${url}/feedback`,  icon: MdFeedback, toolTip: 'Feedback'}
    ]

    let navbarElements;

    switch(JSON.parse(localStorage.getItem('user')).role){
        case 'admin':
            navbarElements = adminNav
            break;
        case 'teamUIC':
            navbarElements = teamNav
            break;
        case 'user':
            navbarElements = userNav
            break;
        default:
            break;
    }
    return(
        <div>
            <Box w="100%" h="auto" bg="purple.600">
                <Stack direction="column" spacing={5} pb="20px">
                    <Link to={`${url}/home`} >
                        <Avatar src={JSON.parse(localStorage.getItem('user')).photo !== ''  ? `http://localhost:3001/usersPics/${isAuth().photo}` : "https://bit.ly/broken-link"} w={["30%", "60%"]}  h={["30%","60%"]} m={["20px","14px"]} />
                    </Link>
                    {navbarElements.map((navElem) => {
                        return (
                            <Tooltip hasArrow label={navElem.toolTip} bg="white" color="purple.600" placement="top" key={navElem.id}>
                                <Center>
                                    <Link to={navElem.path}>
                                        <Icon as={navElem.icon} w={["40%", "50%"]}  h={["40%","50%"]}  ml={5} m={4} color="white"></Icon>
                                    </Link>
                                </Center>
                            </Tooltip>
                        )
                    })}
                </Stack>
            </Box>
        </div>
    )
}

export default Sidebar;