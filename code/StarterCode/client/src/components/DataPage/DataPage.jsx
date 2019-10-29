import React from "react";
import Sidebar from 'react-sidebar';
import { Image, Button } from "react-bootstrap";

import MainHeader from "../MainHeader.jsx";
import Body from './Body.jsx';
import './datapagelayout.css';
import SidebarIcon from '../../images/sidebaricon.png';
import lcslogo from '../../images/lcslogo.jpg';
import leclogo from '../../images/leclogo.jpg';
import lcklogo from '../../images/lcklogo.png';
import lpllogo from '../../images/lpllogo.png';


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

    onClickLCS = () => {
      const url = "http://localhost:5000/LCS_Summer_2019/players";
      this.getPlayers(url);
    }

    onClickLEC = () => {
      const url = "http://localhost:5000/LEC_Summer_2019/players";
      this.getPlayers(url);
    }

    onClickLCK = () => {
      const url = "http://localhost:5000/LCK_Summer_2019/players";
      this.getPlayers(url);
    }

    onClickLPL = () => {
      const url = "http://localhost:5000/LPL_Summer_2019/players";
      this.getPlayers(url);
    }

    formatPlayers = (data) => {
      const options = [];
      data.forEach((name) => {
        options.push({ value: name, label: name });
      });
      this.setState({ options });
    } 

    onSetSidebarOpen = (open) => {
      this.setState({ sidebarOpen: open });
    }

    render () {
      const { sidebarOpen, options } = this.state;
      
      return (
        <div>
          <div>
            <MainHeader />
          </div>

          <Sidebar
            sidebarClassName="sidebar"
            sidebar={
             <div>
               <Button variant="Dark" onClick={this.onClickLCS}> <Image src={lcslogo}/> </Button>
               <Button variant="Dark" onClick={this.onClickLEC}> <Image src={leclogo}/> </Button>
               <Button variant="light" onClick={this.onClickLCK}> <Image src={lcklogo}/> </Button>
               <Button variant="Dark" onClick={this.onClickLPL}> <Image src={lpllogo}/> </Button>
             </div> 
            }
            open={sidebarOpen}
            onSetOpen={this.onSetSidebarOpen}
            styles={{ sidebar: { background: "black" } }}
          >
            <Button onClick={() => this.onSetSidebarOpen(true)} variant="light">
              <Image src={SidebarIcon}/>
            </Button>
          </Sidebar>

          <Body options={options} />

        </div>      
      );
    }
}

export default DataPage;