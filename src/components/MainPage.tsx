import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';
import { LocalStorageService } from '../services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';

interface MainPageState {
  searchTerm: string;
}

export class MainPage extends Component<unknown, MainPageState> {
  state: MainPageState = {
    searchTerm: LocalStorageService.get(LOCAL_STORAGE_KEYS.SEARCH_TERM) || '',
  };

  onSearch = (text: string) => {
    this.setState({
      searchTerm: text,
    });

    LocalStorageService.set(LOCAL_STORAGE_KEYS.SEARCH_TERM, text);
  };

  render() {
    return (
      <div className="main-page">
        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearch={this.onSearch}
        />
        <SearchResults searchTerm={this.state.searchTerm} />
        <ErrorButton />
      </div>
    );
  }
}
