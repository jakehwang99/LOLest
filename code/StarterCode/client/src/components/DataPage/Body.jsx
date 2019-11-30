import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Select from 'react-select';
import Table from './Table.jsx';
import BarChart from './BarChart.jsx';
import ParallelCoords from './ParallelCoords.jsx'
import Cards from './Cards.jsx';
import './datapagelayout.css';
import 'react-tabs/style/react-tabs.css';

const axios = require('axios');

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.onHover = this.onHover.bind(this)
        this.state = {
            activeTab: 0,
            selectedOption: null,
            disablePlayerInfoTab: true,
            hover: "none",
        };
    }

    // Used for hover functionality with D3 - will set the hover element to the correct PLAYER when hovered
    onHover(d) {
        console.log(d.PLAYER)
        this.setState({hover: d.PLAYER})
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });

      const player_name = selectedOption.value;
      const league = this.props.league;
      const player_url = `http://localhost:5000/${league}/${player_name}/page`;

      this.setState({ disablePlayerInfoTab: false });

      axios.get(player_url)
          .then((response) => {
                this.setState({ playerPage: response.data.data },
                  () => console.log(`Option selected:`, selectedOption, this.state.playerPage));
          })
          .catch(function (error) {
                console.log(error);
          })   
    };

    render () {
      const { activeTab, selectedOption, playerPage, disablePlayerInfoTab } = this.state;
      const { options, leagueData } = this.props;   
      
      return (
        <div className="body">
            <div className="tabs">
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
            <Tabs defaultIndex={activeTab} onSelect={activeTab => this.setState({ activeTab })}>
              <TabList>
                  <Tab> Table </Tab>
                  <Tab> Line Chart </Tab>
                  <Tab> Bar Graph </Tab>
                  <Tab disabled={disablePlayerInfoTab}> Player Info </Tab>
              </TabList>
              <TabPanel><Table data={leagueData} /></TabPanel>
              <TabPanel><ParallelCoords size={[1200, 760]} data={leagueData} /></TabPanel>
              <TabPanel><BarChart hoverElement={this.state.hover} onHover={this.onHover} size={[800,560]} data={leagueData} /></TabPanel>
              <TabPanel>
                  { playerPage && <Cards playerPage={playerPage} /> }
              </TabPanel>
            </Tabs>
            </div>
        </div>      
      );
    }
}

Body.propTypes = {
  options: PropTypes.array,
  leagueData: PropTypes.array,
  league: PropTypes.string,
};

export default Body;