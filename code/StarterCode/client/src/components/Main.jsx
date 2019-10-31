import React from "react";
import { Image, Button, ButtonToolbar } from "react-bootstrap";
import MainHeader from "./MainHeader.jsx";
import homeBackground from '../images/homeBackground1.jpg';
import './Main.css';

const axios = require('axios');

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
      return (
        <div>
          <MainHeader />
          <Image src={homeBackground} className="w-100 p-0"/>
          <ButtonToolbar className="buttons">
            <div>
              <Button variant="info">Stream</Button>
              {'              '}
              <Button variant="success">Data</Button>
            </div>
          </ButtonToolbar>
        </div>      
      );
    }
}

export default Main;