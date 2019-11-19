import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Select from 'react-select';
import Table from './Table.jsx';
import Cards from './Cards.jsx';
import './datapagelayout.css';
import 'react-tabs/style/react-tabs.css';

const axios = require('axios');

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 0,
            selectedOption: null,
        };
    }

    handleChange = selectedOption => {
      const player_name = "Perry"
      const player_url = `http://localhost:5000/LCK/${player_name}/page`;

      axios.get(player_url)
          .then((response) => {
                this.setState({ playerPage: response.data.data });
          })
          .catch(function (error) {
                console.log(error);
        })
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption, this.state.playerPage)
      );
    };

    render () {
      const { activeTab, selectedOption } = this.state;
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
                  <Tab> Player Info </Tab>
              </TabList>
              <TabPanel><Table data={leagueData} /></TabPanel>
              <TabPanel>Line Chart</TabPanel>
              <TabPanel>Bar Graph</TabPanel>
              <TabPanel>
                 <Cards />
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
};

export default Body;