import { Component } from 'react';
import { TopBar } from './TopBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';

export class Layout extends Component {
  render() {
    return (
      <div>
        <h1>Layout</h1>
        <TopBar />
        <SearchResults />
        <ErrorButton />
      </div>
    );
  }
}
