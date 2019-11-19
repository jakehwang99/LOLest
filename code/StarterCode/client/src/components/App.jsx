import React from "react";
import Main from './Main';
import Graph from './Graph';
import Parallel from './Parallel';
import css from '../css/page.css';
import backgroundimg from '../images/lolestBackgroundImage.jpg';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Main />
                <Graph />
                <div>
                    <Parallel data={[5,10,1,3]} size={[500,500]} />
                </div>
            </div>      
        );
    }
}
