import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';

interface MainPageState {
  searchTerm: string;
}

export class MainPage extends Component<unknown, MainPageState> {
  state: MainPageState = {
    searchTerm: '',
  };

  onSearch = (text: string) => {
    this.setState({
      searchTerm: text,
    });
  };

  render() {
    return (
      <div className="main-page">
        <SearchBar onSearch={this.onSearch} />
        <SearchResults searchTerm={this.state.searchTerm} />
        <ErrorButton />
      </div>
    );
  }
}
