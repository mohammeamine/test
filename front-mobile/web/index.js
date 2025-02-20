import { AppRegistry } from 'react-native';
import App from '../src/App';

AppRegistry.registerComponent('main', () => App);
AppRegistry.runApplication('main', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
