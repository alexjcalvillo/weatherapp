import React, { useState } from 'react';
import { connect } from 'react-redux';

// Building this project using functional components as much as
// possible to challenge myself and try something new. Start with this header
// component.

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function Header(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  //   const [heading, setHeading] = useState('Nav Bar');

  return (
    <div>
      <h2 style={{ float: 'left' }}>WeatherApp</h2>
    </div>
  );
}

export default connect()(Header);
