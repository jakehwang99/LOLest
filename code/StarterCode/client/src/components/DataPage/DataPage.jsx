import React from "react";
import MainHeader from "../MainHeader.jsx";

const axios = require('axios');

class DataPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTeams();
    }

    getTeams = () => {
        axios.get('http://localhost:5000/players')
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
          <MainHeader />
          {team && <div> Retrieved team from backend: {team[0]} </div>}
        </div>      
      );
    }
}

export default DataPage;