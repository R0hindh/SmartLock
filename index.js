/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Route from './Navigation/route'

AppRegistry.registerComponent(appName, () => Route);
