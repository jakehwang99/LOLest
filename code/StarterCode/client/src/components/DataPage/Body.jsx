import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import Select from 'react-select';
import Table from './Table.jsx';
import BarChart from './BarChart.jsx';
import ParallelCoords from './ParallelCoords.jsx'
import './datapagelayout.css';
import 'react-tabs/style/react-tabs.css';

class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            selectedOption: null,
        };
    }

    handleChange = selectedOption => {
      this.setState(
        { selectedOption },
        () => console.log(`Option selected:`, this.state.selectedOption)
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
              </TabList>
              <TabPanel><Table data={leagueData} /></TabPanel>
              <TabPanel><ParallelCoords size={[1200, 760]} data={leagueData} /></TabPanel>
              <TabPanel><BarChart size={[1200,760]} data={leagueData} /></TabPanel>
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