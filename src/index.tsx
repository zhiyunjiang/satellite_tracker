import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Cesium from 'cesium';
import App from './App';
import 'cesium/Widgets/widgets.css';

Cesium.Ion.defaultAccessToken = process.env.CECIUM_ACCESS_TOKEN || '';

ReactDOM.render(<App />, document.getElementById('root'));
