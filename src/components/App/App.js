import React, { Component } from 'react';
import './App.css';
import Header from '../Header/Header';

import sunny from '../../assets/svgs/Weather icons/sunny.svg';
import { Button, Card, CardBody, Container } from 'reactstrap';

import '../../assets/vendor/nucleo/css/nucleo.css';
import '../../assets/vendor/font-awesome/css/font-awesome.min.css';
import '../../assets/scss/argon-design-system-react.scss';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    console.log(process.env.REACT_APP_API_KEY);
    return (
      <div className="App">
        <Header />
        <hr />
        <h1>Todays weather:</h1>

        <img src={sunny} />
        <br />
        <h5 style={{ display: 'inline', marginRight: '10px' }}>High: 81°</h5>
        <h5 style={{ display: 'inline' }}>Low: 69°</h5>
        <Container>
          <Card>
            <CardBody>
              <p>Welcome to my Weather Application.</p>
              <p>
                This application integrates with the national weather service to
                get your local weather and give you an accurate look at the day.
              </p>
            </CardBody>
          </Card>
        </Container>
        <br />
        <>
          <Button color="info" type="button">
            Button
          </Button>
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
