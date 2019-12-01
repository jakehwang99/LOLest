import React from "react";
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem, Button, Image } from "react-bootstrap";
import plusIcon from "../../images/plusIcon.png";

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        const { playerPage, playerName } = this.props;
        console.log(playerPage);
        return(
            <div>
                <Card className="text-center">
                    {/* <Button variant="light"> <Image src={plusIcon}/> Add to list </Button> */}
                    <Card.Title>{playerName}</Card.Title>
                    <Card.Img className="mx-auto d-block" style={{ width: '18rem' }} variant="top" src={playerPage.Image} />
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Card.Title>Name</Card.Title>
                                <Card.Text>
                                    {playerPage.Name}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Country of Birth</Card.Title>
                                <Card.Text>
                                    {playerPage['Country of Birth']}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Birthday</Card.Title>
                                <Card.Text>
                                    {playerPage.Birthday}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Residency</Card.Title>
                                <Card.Text>
                                    {playerPage.Residency}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Team</Card.Title>
                                <Card.Text>
                                    {playerPage.Team}
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Role</Card.Title>
                                <Card.Text>
                                    {playerPage.Role}
                                </Card.Text>
                            </ListGroupItem>
                        </ListGroup>
                    </Card.Body>
                </Card>  
            </div>
        );
    }

}

Cards.propTypes = {
  playerPage: PropTypes.object,
  playerName: PropTypes.string,
};

export default Cards;