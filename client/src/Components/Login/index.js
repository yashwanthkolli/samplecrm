import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
import { setLocalStorage } from '../../helpers/auth.helpers.js';

const ice = require('../../images/001.png').default;
const signIn = require('../../images/signIn.svg').default;

function Login({history}) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");

        axios.post(`${process.env.REACT_APP_AUTH}/userLogin`,{
            email: email,
            password: password
        })
        .then((res) => {
            setLocalStorage('token', res.data.token);
            setLocalStorage('user', res.data.payload);

            toast({
                title: "Login Successful",
                description: "Please wait while we redirect you!",
                duration: 3000,
                position: "top",
                status: "success"
            })

            history.push('/crm');
        })
        .catch((err) => {
            toast({
                title: "Error Occured",
                description: "Something Went Wrong",
                duration: 3000,
                position: "top"
            })
        })
    }

    // a check for redirecting the authenticated users back to the CRM home page

    return (
        <Section>
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
                                    <TextField
                                        fullWidth
                                        name="email"
                                        type="email"
                                        label="Email"
                                        required
                                        autoComplete="off"
                                        value={email}
                                        onChange={e=>setEmail(e.target.value)}
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