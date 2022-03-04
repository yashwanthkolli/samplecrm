import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Select } from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import {
    Section,
    Holder,
    Container,
    Left,
    Right,
    Logo,
    Ice,
    Form
} from './LoginComponents.js';
import { setSessionStorage, isAuth, setLocalStorage, updateUserTimingsOnLogin, decodeSessionStorage } from '../../helpers/auth.helpers.js';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

const ice = require('../../logo.svg').default;
const signIn = require('../../logo.svg').default;

function Login({history}) {
    const [scode,setScode]=useState("");
    const [ sid, setSid ] = useState("");
    const [ password, setPassword ] = useState("");
    const [stations, setStations ] =useState([]);
    
     React.useEffect(() => {
        axios.post(`${process.env.REACT_APP_AUTH}/stationLogin`)
        .then((res) => {
            setStations(res.data.station);
            })
        .catch((err) => {
            console.log(err);
        });
    }, []);
    


    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setSid("");
        setPassword("");
        setScode("");

        axios.post(`${process.env.REACT_APP_AUTH}/userLogin`,{
            sid: sid,
            password: password,
            scode: scode

        })
        .then(async (res) => {
            if(res.data.response === 1){
                await setSessionStorage('token', res.data.token);
                await setSessionStorage('user', res.data.payload);

                history.push('/crm/home');
            } else {
                toast({
                    description: "Incorrect Credentials",
                    duration: 2000,
                    position: "top"
                })
            }
        })
        .catch((err) => {
            console.log(err)
            toast({
                title: "Error Occured",
                description: "Something Went Wrong",
                duration: 3000,
                position: "top"
            })
        })
    }

    return (
        <Section>
            { isAuth() ? <Redirect to="/crm/home" /> : null}
            <Holder>
                <Paper elevation={5} variant="elevation" style={{width: "100%", height: "100%"}}>
                    <Container>
                        <Left>
                            <Logo src={signIn} />
                        </Left>
                        <Right>
                            <Ice src={ice} />
                            <form onSubmit={handleSubmit} style={{width: "90%"}}>
                                <Form>
                                    <Select placeholder='Select Station' onChange={e =>setScode(e.target.value)}>
                                        { 
                                            stations.map((station) => <option value={station.scode}>{station.sname}</option>)
                                        }
                                       
                                    </Select>
                                    <TextField
                                        fullWidth
                                        name="sid"
                                        type="text"
                                        label="sid"
                                        required
                                        autoComplete="off"
                                        value={sid}
                                        onChange={e=>setSid(e.target.value)}
                                        style={{marginBottom: "10px"}}
                                    />
                                    <TextField
                                        fullWidth
                                        name="password"
                                        type="password"
                                        label="Password"
                                        required
                                        autoComplete="off"
                                        value={password}
                                        onChange={e=>setPassword(e.target.value)}
                                        style={{marginBottom: "10px"}}
                                    />
                                    <Button color="primary" variant="contained" type="submit">
                                        Log In
                                    </Button>
                                </Form>
                            </form>
                        </Right>
                    </Container>
                </Paper>
            </Holder>
        </Section>
    )
}

export default Login;