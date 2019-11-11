import React from "react";
import { Image, Button, ButtonToolbar, ButtonGroup } from "react-bootstrap";
import MainHeader from "./MainHeader.jsx";
import homeBackground from '../images/homeBackground1.jpg';
import './Main.css';

const axios = require('axios');

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.getTeams();
    }

    getTeams = () => {
        axios.get('http://localhost:5000/teams')
          .then((response) => {
            // handle success
            this.setState({ team: response.data });
            console.log(response.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }

    render () {
      const { team } = this.state;
      return (
        <div>
          {/* {team && <div> Retrieved team from backend: {team} </div>} */}
          <MainHeader />
          <Image src={homeBackground} className="w-100 p-0"/>
          <ButtonToolbar className="buttons">
            <div>
              <Button variant="info" href="http://localhost:8080/stream">Stream</Button>
              {'              '}
              <Button variant="success" href="http://localhost:8080/stream">Data</Button>
            </div>
          </ButtonToolbar>
        </div>      
      );
    }
}

export default Main;