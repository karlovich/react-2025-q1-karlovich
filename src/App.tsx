import { Component } from 'react';
import './App.css';
import { MainPage } from './components/MainPage';

class App extends Component {
  render() {
    return (
      <>
        <header className="bg-black text-white p-4">
          <h1 className="text-2xl font-bold text-center">
            Star Wars Universe: Find Information About Your Favorite Characters
          </h1>
        </header>
        <main className="p-4 bg-white text-black">
          <MainPage />
        </main>
        <footer className="bg-black text-white p-4">
          <h5 className="text-center">
            <a
              href="https://github.com/karlovich/"
              target="_blank"
              rel="noreferrer"
            >
              github: karlovich. RS React 2025 Q1.
            </a>
          </h5>
        </footer>
      </>
    );
  }
}

export default App;
