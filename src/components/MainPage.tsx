import { Component } from 'react';
import { SearchBar } from './SearchBar';
import { SearchResults } from './SearchResults';
import { ErrorButton } from './ErrorButton';
import { LocalStorageService } from '../services/LocalStorageService';
import { LOCAL_STORAGE_KEYS } from '../shared/constants';
import { ErrorBoundary } from './ErrorBoundary';
import { SearchFallback } from './SearchFallback';

interface MainPageState {
  searchTerm: string;
  raiseError: boolean;
}

export class MainPage extends Component<unknown, MainPageState> {
  state: MainPageState = {
    searchTerm: LocalStorageService.get(LOCAL_STORAGE_KEYS.SEARCH_TERM) || '',
    raiseError: false,
  };

  onSearch = (text: string) => {
    this.setState({
      raiseError: false,
      searchTerm: text,
    });

    LocalStorageService.set(LOCAL_STORAGE_KEYS.SEARCH_TERM, text);
  };

  onRaiseError = () => {
    this.setState({
      raiseError: true,
    });
  };

  render() {
    return (
      <div className="main-page">
        <SearchBar
          searchTerm={this.state.searchTerm}
          onSearch={this.onSearch}
        />
        <ErrorBoundary
          fallbackUI={<SearchFallback />}
          tryAgain={!this.state.raiseError}
        >
          <SearchResults
            searchTerm={this.state.searchTerm}
            showError={this.state.raiseError}
          />
        </ErrorBoundary>
        <ErrorButton onRaiseError={this.onRaiseError} />
      </div>
    );
  }
}
