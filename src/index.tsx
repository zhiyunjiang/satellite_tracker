import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Cesium from 'cesium';
import App from './App';
import 'cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiMTQyNmVmYi1mZjRhLTQxNWMtOWRkOS0yMTdlNDczNDU3NTciLCJpZCI6MzE2MzgsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTU3NDU0NzR9.8N3JUCIZNAHkyCpQDvgYh9YmSbckG4I5JJM1SmiaOiM';

ReactDOM.render(<App />, document.getElementById('root'));
