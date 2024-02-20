import {AppRegistry} from 'react-native';
import App from './App';

const appName = require('./app.json').name;

AppRegistry.registerComponent(appName, () => App);
