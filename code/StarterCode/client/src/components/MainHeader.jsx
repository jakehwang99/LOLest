import React from "react";
import { Container, Row, Navbar, Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import logo from '../images/logo3.png';
import './MainHeader.css';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {
      return (
        <Container>
          <Row className="justify-content-md-center">
            <Navbar bg="white">
              <Navbar.Brand href="http://localhost:8080">
                <Button variant="light">
                  <img
                    src={logo}
                    width="50"
                    height="50"
                    alt="lolest logo"
                  />
                </Button>
              </Navbar.Brand>
            </Navbar>
          </Row>
        </Container>      
      );
    }
}

export default MainHeader;