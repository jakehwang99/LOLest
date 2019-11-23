import React from "react";
import PropTypes from 'prop-types';
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import Faker from '../../images/sktFaker.png';

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render (){
        return(
            <div>
                <Card className="text-center">
                    <Card.Img className="mx-auto d-block" style={{ width: '18rem' }} variant="top" src={Faker} />
                    <Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <Card.Title>Name</Card.Title>
                                <Card.Text>
                                    Player's name goes here
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Country of Birth</Card.Title>
                                <Card.Text>
                                    Country of Birth goes here
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Birthday</Card.Title>
                                <Card.Text>
                                    Birthday goes here
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Residency</Card.Title>
                                <Card.Text>
                                    Residency goes here
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Team</Card.Title>
                                <Card.Text>
                                    Team goes here
                                </Card.Text>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Card.Title>Role</Card.Title>
                                <Card.Text>
                                    Role goes here
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
    playerData: PropTypes.object,
};

export default Cards;