import { Component } from 'react';
import './App.css';
import { MainPage } from './components/MainPage';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <h1>Title of the project</h1>
        </header>
        <main>
          <MainPage />
        </main>
        <footer>
          <h5>Footer of the project</h5>
        </footer>
      </>
    );
  }
}

export default App;
