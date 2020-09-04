import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Header from '../Header/Header';

import sunny from '../../assets/svgs/Weather icons/sunny.svg';
import nightclear from '../../assets/svgs/Weather icons/nightclear.svg';
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
  CardImg,
  CardText,
} from 'reactstrap';

import '../../assets/vendor/nucleo/css/nucleo.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/scss/argon-design-system-react.scss';

class App extends Component {
  state = {
    zip: '',
    locations: [],
    currentLocation: '',
    forecast: {},
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
      currentLocation: location.formatted,
    });
    this.getWeather(location.geometry);
  };

  getWeather(geometry) {
    const lat = geometry.lat;
    const lng = geometry.lng;
    axios
      .get(`https://api.weather.gov/points/${lat},${lng}`)
      .then((response) => {
        console.log(response.data);
        const forecast = response.data.properties.forecast;
        axios
          .get(`${forecast}`)
          .then((response) => {
            console.log(response.data);
            const forecast = response.data.properties.periods[0];
            this.setState({
              forecast,
            });
          })
          .catch((err) => {
            console.log(err);
            alert("That forecast isn't right.");
          });
      })
      .catch((err) => {
        console.log(err);
        alert('There was an error with the weather report.');
      });
  }
  // Renders the entire app on the DOM
  render() {
    console.log(this.state.locations);
    let icon = null;
    if (this.state.forecast.shortForecast === 'Clear') {
      icon = nightclear;
    }
    return (
      <div className="App">
        <Header />
        <hr />

        {this.state && this.state.forecast && (
          <Container>
            <Row>
              <Card style={{ margin: 'auto', width: '50%' }}>
                <CardImg
                  top
                  style={{
                    maxWidth: '50%',
                    maxHeight: '50%',
                    margin: 'auto',
                    width: '50%',
                  }}
                  src={icon}
                  alt="icon for the current weather reading"
                />
                <CardTitle>
                  <h3>{this.state.forecast.name}</h3>
                </CardTitle>
                <CardBody>
                  <CardText>{this.state.forecast.shortForecast}</CardText>
                  <CardText>
                    {this.state.forecast.temperature}{' '}
                    {this.state.forecast.temperatureUnit} °
                  </CardText>
                </CardBody>
              </Card>
            </Row>
          </Container>
        )}
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
                                onClick={this.setLocation(loc)}
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
      </div>
    );
  }
}

export default App;
