import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';
import logo from '../assets/logo.svg';

const NavBar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar variant="light" className="shadow-sm">
      <Container>
        <div>
          <img src={logo} alt="logo" />
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </div>
        {auth.loggedIn && <Button onClick={auth.logOut}>{t('log out')}</Button>}
      </Container>
    </Navbar>
  );
};

export default NavBar;
