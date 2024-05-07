import React, {useContext, useState} from 'react';
import {Container, Form, Card, FormControl, Button, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {login, registartion} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registartion(email, password);
            }
                user.setUser(user)
                user.setIsAuth(true)
                navigate(SHOP_ROUTE);
        } catch(e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className='d-flex justify-content-center align-items-center'
            style={{height: '100vh'}}
        >
            <Card style={{width: 600}} className="p-5">
                <h2 className="text-center mb-4">
                    {isLogin ? 'Authorization' : 'Registration'}
                </h2>
                <Form className="d-flex flex-column">
                    <FormControl
                        placeholder='Enter your email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormControl
                        className="mt-3"
                        placeholder='Enter your password...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    <Row className="d-flex justify-content-between mt-3">
                        {isLogin ?
                        <div>
                            Don't have an account?
                            <NavLink className="ms-1" to={REGISTRATION_ROUTE}>Sign up</NavLink>
                        </div>
                            :
                            <div>
                                Have an account?
                                <NavLink className="ms-1" to={LOGIN_ROUTE}>Log in</NavLink>
                            </div>
                        }
                        <Button
                            className="mt-2"
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Log in' : 'Sign up'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;
