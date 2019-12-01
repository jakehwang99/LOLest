import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Select from 'react-select';
import Table from './Table.jsx';
import Cards from './Cards.jsx';
import Compare from "../ComparePage/ComparePage.jsx";
import './datapagelayout.css';
import 'react-tabs/style/react-tabs.css';

const axios = require('axios');

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            selectedOption: null,
            disablePlayerInfoTab: true,
        };
    }

    handleChange = selectedOption => {
      this.setState({ selectedOption });

      const player_name = selectedOption.value.toLowerCase();

      const league = this.props.league;
      const player_url = `http://localhost:5000/${league}/${player_name}/page`;

      this.setState({ disablePlayerInfoTab: false, player_name: selectedOption.value });

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
      const { activeTab, selectedOption, playerPage, disablePlayerInfoTab, player_name } = this.state;
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
                  <Tab> Compare </Tab>
                  <Tab disabled={disablePlayerInfoTab}> Player Info </Tab>
              </TabList>
              <TabPanel><Table data={leagueData} /></TabPanel>
              <TabPanel>Line Chart</TabPanel>
              <TabPanel>Bar Graph</TabPanel>
              <TabPanel><Compare /></TabPanel>
              <TabPanel>
                  { playerPage && player_name && <Cards playerPage={playerPage} playerName={player_name} /> }
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