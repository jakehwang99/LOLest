import React from "react";
import { Image, Button, ButtonToolbar } from "react-bootstrap";
import MainHeader from "./MainHeader.jsx";
import homeBackground from '../images/homeBackground3.jpg';
import './Main.css';

const axios = require('axios');

const ConsoleLog = ({children}) => {
    console.log(children);
    return false;
};

const divStyle = {
  width: '100%',
  height: '700px',
  backgroundImage: `url(${homeBackground})`,
  backgroundSize: 'cover'
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
          <div style={divStyle}>
            <ButtonToolbar className="buttons">
              <div>
                <Button style={{ width: '8rem' }} variant="light" href="http://localhost:8080/stream">Stream</Button>
                {'        '}
                <Button style={{ width: '8rem' }} variant="light" href="http://localhost:8080/data">Data</Button>

              </div>
            </ButtonToolbar>
          </div>
        </div>      
      );
    }
}

export default Main;
