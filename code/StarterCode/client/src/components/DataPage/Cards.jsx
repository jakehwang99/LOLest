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
        const playerPage = this.props.playerPage;

        return(
            <div>
                <Card className="text-center">
                    <Card.Img className="mx-auto d-block" style={{ width: '18rem' }} variant="top" src={Faker} />
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
  playerPage: PropTypes.array,
};

export default Cards;