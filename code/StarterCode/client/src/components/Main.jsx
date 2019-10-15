import React from "react";

const axios = require('axios');

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTeams();
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
          {team && <div> Retrieved team from backend: {team} </div>}
        </div>      
      );
    }
}

export default Main;