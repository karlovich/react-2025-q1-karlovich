import { Component } from 'react';
import './App.css';
import { MainPage } from './components/MainPage';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <h1>Star War Universe</h1>
        </header>
        <main>
          <MainPage />
        </main>
        <footer>
          <h5>Footer of the universe</h5>
        </footer>
      </>
    );
  }
}

export default App;
