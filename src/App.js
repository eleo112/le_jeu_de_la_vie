import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Game from './components/Game';

class App extends React.Component {
  render() {
    console.log('App', App);
    return (
      <Game />
    )
  }
}

export default App;
