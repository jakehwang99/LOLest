import React from "react";
import Sidebar from 'react-sidebar';
import { Image, Button } from "react-bootstrap";

import MainHeader from "../MainHeader.jsx";
import Body from './Body.jsx';
import './comparepagelayout.css';


const axios = require('axios');

class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false
        };
        // this.getTeams();
    }

    getPlayers = (url) => {
        axios.get(url)
          .then((response) => {
            // handle success
            this.formatPlayers(response.data.data);
            console.log(response.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }

    getData = (url) => {
      axios.get(url)
          .then((response) => {
            // handle success
            this.setState({ leagueData: response.data.data });
            console.log(response.data.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }

    formatPlayers = (data) => {
      const options = [];
      data.forEach((name) => {
        options.push({ value: name, label: name });
      });
      this.setState({ options });
    } 

    render () {
      const { options, leagueData } = this.state;
      
      return (
        <div>
          <div>
            <MainHeader />
          </div>

          <Body options={options} leagueData={leagueData} />

        </div>      
      );
    }
}

export default DataPage;
