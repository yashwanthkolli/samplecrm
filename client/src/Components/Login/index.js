import React from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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

const ice = require('../../images/001.png').default;
const signIn = require('../../images/signIn.svg').default;

function Login() {

    const handleSubmit = (e) => {

    }

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
                                    />
                                    <TextField
                                        fullWidth
                                        name="password"
                                        type="password"
                                        label="Password"
                                        required
                                        autoComplete="off"
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