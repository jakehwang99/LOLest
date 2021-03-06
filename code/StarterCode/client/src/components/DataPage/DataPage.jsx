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
          sidebarOpen: false,
          isLeagueSelected: false
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

    onClickLCS = () => {
      const playersUrl = "http://localhost:5000/LCS_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LCS_Summer_2019";
      this.getPlayers(playersUrl);
      this.getData(leagueUrl);
      this.setState({ league: "LCS", isLeagueSelected: true});
    }

    onClickLEC = () => {
      const playersUrl = "http://localhost:5000/LEC_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LEC_Summer_2019";
      this.getPlayers(playersUrl);
      this.getData(leagueUrl);
      this.setState({ league: "LEC", isLeagueSelected: true});
    }

    onClickLCK = () => {
      const playersUrl = "http://localhost:5000/LCK_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LCK_Summer_2019";
      this.getPlayers(playersUrl);
      this.getData(leagueUrl);
      this.setState({ league: "LCK", isLeagueSelected: true});
    }

    onClickLPL = () => {
      const playersUrl = "http://localhost:5000/LPL_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LPL_Summer_2019";
      this.getPlayers(playersUrl);
      this.getData(leagueUrl);
      this.setState({ league: "LPL", isLeagueSelected: true });
    }

    formatPlayers = (data) => {
      const options = [];
      data.forEach((name) => {
        options.push({ value: name, label: name });
      });
      this.setState({ options });
    } 

    onSetSidebarOpen = (open) => {
      if(open == false) {
        d3.select(".nopointers")
          .style("pointer-events", "none");
      }
      else {
        d3.select(".nopointers")
          .style("pointer-events", "all");
      }
      this.setState({ sidebarOpen: open });
    }

    render () {
      const { sidebarOpen, options, leagueData, league, isLeagueSelected } = this.state;
      
      return (
        <div>
          <div className="nopointers">
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
          </div>
          <div>
            <MainHeader />
          </div>

          <Body options={options} leagueData={leagueData} league={league} isLeagueSelected={isLeagueSelected}/>

        </div>      
      );
    }
}

export default DataPage;