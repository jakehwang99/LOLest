import React from "react";
import { Image, Button, ButtonToolbar } from "react-bootstrap";
import MainHeader from "./MainHeader.jsx";
import homeBackground from '../images/homeBackground1.jpg';
import './Main.css';

const axios = require('axios');

const ConsoleLog = ({children}) => {
    console.log(children);
    return false;
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.state = {};
    }

    render () {
      return (
        <div>
          <MainHeader />
          <Image src={homeBackground} className="w-100 p-0"/>
          <ButtonToolbar className="buttons">
            <div>
              <Button variant="info" href="http://localhost:8080/stream">Stream</Button>
              {'              '}
              <Button variant="success" href="http://localhost:8080/data">Data</Button>
            </div>
          </ButtonToolbar>
        </div>      
      );
    }
}

export default Main;
