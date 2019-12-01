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
              <Button style={{ width: '8rem' }} variant="dark" href="http://localhost:8080/stream">Stream</Button>
              {'        '}
              <Button style={{ width: '8rem' }} variant="dark" href="http://localhost:8080/data">Data</Button>

            </div>
          </ButtonToolbar>
        </div>      
      );
    }
}

export default Main;
