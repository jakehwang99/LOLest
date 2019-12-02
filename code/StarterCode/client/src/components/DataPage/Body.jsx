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
        this.onHover = this.onHover.bind(this);
        this.onBrush = this.onBrush.bind(this);
        this.state = {
            activeTab: 0,
            selectedOption: null,
            disablePlayerInfoTab: true,
            hover: "none",
            hover2: {},
            filters: {}, 
            filtered: this.props.leagueData, 
        };
    }

    // Used for hover functionality with D3 - will set the hover element to the correct PLAYER when hovered
    onHover(d) {
        this.setState({hover: d.PLAYER, hover2: d});
    }

    onBrush(filter) {
        let li = [];
        for(let key in filter) {
            li.push([key, filter[key]])
        }
        let filtered = this.props.leagueData.filter(d =>
            li.every((b) => {
                let attr = b[0]
                let bounds = b[1]
                return !bounds || bounds[0] > d[attr] && d[attr] > bounds[1]
            })
        )
        if(filtered.length == 0) {
            filtered = null;
        }
        this.setState({filtered})

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
                  <Tab disabled={disablePlayerInfoTab}> Player Info </Tab>
              </TabList>
              <TabPanel><Table data={leagueData} /></TabPanel>
              <TabPanel><ParallelCoords 
                            size={[1400, 760]} 
                            onBrush={this.onBrush}
                            filteredData={this.state.filtered}
                            data={leagueData} 
                            league={this.props.league}
                        />
              </TabPanel>
              <TabPanel><BarChart 
                            hoverElement={this.state.hover} 
                            hoverFullElement={this.state.hover2}
                            onHover={this.onHover} 
                            size={[1200, 760]} 
                            data={leagueData}
                            league={this.props.league} 
                        />
              </TabPanel>
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