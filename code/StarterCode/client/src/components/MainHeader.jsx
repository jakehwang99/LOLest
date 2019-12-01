import React from "react";
import { Navbar, Button } from "react-bootstrap";
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
        <div className="d-inline-block">
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
             <Navbar.Brand href="http://localhost:8080/login" className="loginButton">
              <Button variant="light">
                Login
              </Button>
            </Navbar.Brand>
          </Navbar>
        </div>      
      );
    }
}

export default MainHeader;