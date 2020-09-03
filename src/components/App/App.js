import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Header from '../Header/Header';

import sunny from '../../assets/svgs/Weather icons/sunny.svg';
import {
  Button,
  Card,
  CardBody,
  Container,
  CardTitle,
  Input,
  Label,
  Row,
  Col,
} from 'reactstrap';

import '../../assets/vendor/nucleo/css/nucleo.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/scss/argon-design-system-react.scss';

class App extends Component {
  state = {
    zip: '',
    locations: [],
    currentLocation: '',
  };

  handleInput = (event) => {
    this.setState({
      zip: event.target.value,
    });
  };
  getCoordinates = () => {
    console.log('getCoordinates', this.state.zip);
    axios
      .get(
        `/api/geo/getlonglat/${this.state.zip}/${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        this.setState({
          locations: response.data.results,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("It didn't work.");
      });

    this.setState({
      zip: '',
    });
  };

  setLocation = (location) => (event) => {
    console.log(location);
    this.setState({
      currentLocation: location,
    });
  };
  // Renders the entire app on the DOM
  render() {
    console.log(this.state.locations);
    return (
      <div className="App">
        <Header />
        <hr />
        <h1>Todays weather:</h1>

        <img src={sunny} />
        <br />
        <h5 style={{ display: 'inline', marginRight: '10px' }}>High: 81°</h5>
        <h5 style={{ display: 'inline' }}>Low: 69°</h5>
        <hr />
        <h4>Location: {this.state.currentLocation}</h4>
        <Container>
          <Card>
            <CardBody>
              <CardTitle>Welcome to my Weather Application.</CardTitle>
              <p>
                This application integrates with the national weather service to
                get your local weather and give you an accurate look at the day.
              </p>
            </CardBody>
          </Card>
        </Container>
        <br />
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col md="4">
                  <Card>
                    <CardBody>
                      <Label htmlFor="zip">
                        To begin getting your local weather please enter your
                        zipcode:
                      </Label>
                      <Input
                        type="number"
                        id="zip"
                        bsSize="sm"
                        onChange={this.handleInput}
                        value={this.state.zip}
                      />
                      <br />
                      <Button
                        outline
                        color="info"
                        size="sm"
                        onClick={this.getCoordinates}
                      >
                        Submit
                      </Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="8">
                  <Card inverse style={{ backgroundColor: '#333' }}>
                    <CardBody>
                      Hello there. Did you mean one of these locations?
                      <hr />
                      <ul>
                        {this.state &&
                          this.state.locations &&
                          this.state.locations.map((loc, i) => {
                            return (
                              <li
                                key={i}
                                className="results"
                                onClick={this.setLocation(loc.formatted)}
                              >
                                {loc.formatted}
                              </li>
                            );
                          })}
                      </ul>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        <>
          <Button className="btn-icon btn-3" color="primary" type="button">
            <span className="btn-inner--icon">
              <i className="ni ni-bag-17" />
            </span>
            <span className="btn-inner--text">With icon</span>
          </Button>
        </>
      </div>
    );
  }
}

export default App;
