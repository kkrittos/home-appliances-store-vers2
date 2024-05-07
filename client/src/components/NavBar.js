import React, { useContext } from 'react';
import { Context } from "../index";
import { Container, Navbar, Nav, Button, Image } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE, BASKET_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';
import basket from "../assets/basket.svg";

const NavBar = observer(() => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate(LOGIN_ROUTE);
    };

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
    };

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{ color: 'white', fontSize: 24 }} to={user.isAuth ? SHOP_ROUTE : LOGIN_ROUTE}>TechParadise</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto">
                        <Button
                            variant='outline-light'
                            onClick={handleLogout}
                        >
                            Log out
                        </Button>
                            <Button
                                variant='outline-light'
                                onClick={() => navigate(ADMIN_ROUTE)}
                                className='ms-3'>
                                Admin Panel
                            </Button>
                        <Button
                            variant='outline-light'
                            onClick={() => navigate(BASKET_ROUTE)}
                            className='ms-3'>
                            <Image src={basket} className="basket-icon" alt="Basket" />
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant='outline-light'
                            onClick={() => navigate(LOGIN_ROUTE)}>Authorization</Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;