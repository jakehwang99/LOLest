import React from "react";

import MainHeader from "../MainHeader.jsx";
import './comparepagelayout.css';


const axios = require('axios');

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarOpen: false
        };
        // this.getTeams();
    }

    render () {
      
      return (
        <div>
          <div>
            <MainHeader />
          </div>

        </div>      
      );
    }
}

export default ComparePage;
