import React, { Component } from 'react';
import axios from 'axios';

import './App.css';
import Header from '../Header/Header';

// Bringing in svgs for weather icon
import sunny from '../../assets/svgs/Weather icons/sunny.svg';
import nightclear from '../../assets/svgs/Weather icons/nightclear.svg';
import cloudysun from '../../assets/svgs/Weather icons/cloudysun.svg';

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

  componentDidMount() {
    if ('geolocation' in navigator) {
      let coords = {};
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        this.getLocation(coords);
        this.getWeather(coords);
      });
    } else {
      console.log('no location');
    }
  }

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

  getLocation(coords) {
    const lng = coords.lng;
    const lat = coords.lat;
    axios
      .get(`/api/geo/getlonglat/${lng}/${lat}/${process.env.REACT_APP_API_KEY}`)
      .then((response) => {
        this.setState({
          currentLocation: response.data.results[0].formatted,
        });
      })
      .catch((err) => {
        alert('Location cannot be found. Try a different zipcode.');
      });
  }

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
    console.log(this.state);
    let icon = null;
    let color = null;
    switch (this.state.forecast.shortForecast) {
      case 'Clear':
        icon = nightclear;
        break;
      case 'Sunny':
        icon = sunny;
        color = 'yellow';
        break;
      case 'Isolated Rain Showers then Mostly Sunny':
        icon = cloudysun;
        break;
      default:
        icon = null;
    }

    return (
      <div className="App">
        <Header />
        <br />
        <Container>
          <Card>
            <CardBody>
              <CardTitle>Welcome to my Weather Application.</CardTitle>
              <p>
                This application integrates with the National Weather Service
                API to get your local weather and give you an accurate look at
                the day.
              </p>
            </CardBody>
          </Card>
        </Container>
        <hr />

        {this.state && this.state.forecast && (
          <Container>
            <Row>
              <Col sm="8">
                <Card className="text-center bg-info">
                  <CardBody>
                    <CardTitle>
                      {this.state.forecast
                        ? this.state.currentLocation
                        : 'No location selected yet'}
                    </CardTitle>
                  </CardBody>
                  <Row>
                    <Col sm="3">
                      <CardImg
                        top
                        style={{
                          justifyContent: 'left',
                          width: '50%',
                          display: 'inline-block',
                          verticalAlign: 'middle',
                          color: color,
                        }}
                        src={icon}
                        alt="icon for the current weather reading"
                      />
                    </Col>
                    <Col sm="6" style={{ padding: '20px' }}>
                      <h1
                        style={{ textAlign: 'left', verticalAlign: 'middle' }}
                      >
                        {this.state.forecast.temperature}{' '}
                        {this.state.forecast.temperatureUnit} °
                      </h1>
                    </Col>
                  </Row>
                  <CardTitle>
                    <h3>{this.state.forecast.name}</h3>
                  </CardTitle>
                  <CardBody style={{ backgroundColor: '#f6f9fc' }}>
                    <CardText
                      style={{ display: 'inline', verticalAlign: 'middle' }}
                    >
                      {this.state.forecast.shortForecast}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
        <br />
        <br />
        <Container>
          <Card style={{ marginBottom: '25px' }}>
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
                  <Card style={{ backgroundColor: '#f6f9fc' }}>
                    <CardTitle style={{ padding: '10px' }}>
                      Hello there. Did you mean one of these locations?
                    </CardTitle>
                    <CardBody>
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
