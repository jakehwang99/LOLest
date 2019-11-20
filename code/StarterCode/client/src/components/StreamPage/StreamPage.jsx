import React from "react";
import MainHeader from "../MainHeader.jsx";

const EMBED_URL = 'https://embed.twitch.tv/embed/v1.js';
class StreamPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
      return (
        <div>
          <MainHeader />
          <body>
          <iframe
            src="https://player.twitch.tv/?channel=riotgames"
            height="600"
            width="100%"
            frameborder="<frameborder>"
            scrolling="<scrolling>"
            allowfullscreen="<allowfullscreen>">
        </iframe>

          </body>
        </div>      
      );
    }
}

export default StreamPage;