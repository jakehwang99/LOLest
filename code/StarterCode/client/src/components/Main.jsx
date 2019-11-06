import React from "react";

const axios = require('axios');

const ConsoleLog = ({children}) => {
    console.log(children);
    return false;
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.state = {};
    }
    
    render () {
      const { team } = this.state;
      return (
        <div>
        </div>
      );
    }
}

export default Main;
