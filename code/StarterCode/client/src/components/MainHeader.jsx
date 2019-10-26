import React from "react";
import { Navbar } from "react-bootstrap";
import logo from '../images/logo3.png';
import './MainHeader.css';

class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
      return (
        <div className="d-inline-block">
          <Navbar bg="white">
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="50"
                height="50"
                alt="lolest logo"
              />
            </Navbar.Brand>
          </Navbar>
        </div>      
      );
    }
}

export default MainHeader;