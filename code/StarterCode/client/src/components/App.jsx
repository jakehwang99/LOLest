import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Main from './Main.jsx';
import DataPage from './DataPage/DataPage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Main} />
                    <Route exact path="/data" component={DataPage} />
                </div>
            </Router>    
        );
    }
}