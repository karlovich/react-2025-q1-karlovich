import { Component } from 'react';
import { TopBar } from './TopBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';

export class MainPage extends Component {
  render() {
    return (
      <div>
        <h1>MainPage</h1>
        <TopBar />
        <SearchResults searchTerm="" />
        <ErrorButton />
      </div>
    );
  }
}
