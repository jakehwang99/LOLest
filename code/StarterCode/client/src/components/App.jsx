import React from "react";
import Main from './Main';
import css from '../css/page.css';
import backgroundimg from '../images/lolestBackgroundImage.jpg';


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                <img style={css} src={backgroundimg} />
                <Main />
            </div>      
        );
    }
}