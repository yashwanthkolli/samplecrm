import React from 'react';
import Paper from '@material-ui/core/Paper';
import {
    Section,
    Holder,
    Container,
    Left,
    Right,
    Logo
} from './LoginComponents.js';
const ice = require('../../images/001.png').default;

function Login() {

    return (
        <Section>
            <Holder>
                <Paper elevation={5} variant="elevation" style={{width: "100%", height: "100%"}}>
                    <Container>
                        <Left>
                            <Logo src={ice} />
                        </Left>
                        <Right>
                        </Right>
                    </Container>
                </Paper>
            </Holder>
        </Section>
    )
}

export default Login;