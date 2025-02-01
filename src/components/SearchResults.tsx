import { Component } from 'react';
import { Card } from './Card';
import { Character } from '../shared/types';
import { Loader } from './Loader';
import { SearchFallback } from './SearchFallback';

interface SearchResultsProps {
  searchTerm: string;
  showError: boolean;
}

interface SearchResultsState {
  count: number;
  results: Character[];
  loading: boolean;
  error: boolean;
}

export class SearchResults extends Component<
  SearchResultsProps,
  SearchResultsState
> {
  state: SearchResultsState = {
    count: 0,
    results: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (this.props.showError) {
      throw new Error('Let the fight begin');
    }
    if (prevProps.searchTerm != this.props.searchTerm) {
      this.setState({ error: false }, () => {
        this.fetchData(this.props.searchTerm);
      });
    }
  }

  async fetchData(text: string) {
    try {
      this.setState({ loading: true });

      const response = await fetch(
        `https://swapi.dev/api/people/?search=${text}`
      );

      const data = await response.json();

      this.setState({
        count: data.count,
        results: data.results,
        loading: false,
      });
    } catch {
      this.setState({
        error: true,
        loading: false,
      });
    }
  }

  render() {
    if (this.state.error) {
      return <SearchFallback />;
    }

    return (
      <div>
        <div>
          <h1>Search Results Area. Total Count: {this.state.count}</h1>
        </div>
        <div>
          {this.state.loading ? (
            <Loader />
          ) : (
            this.state.results.map((character, index) => {
              if (character) return <Card key={index} character={character} />;
            })
          )}
        </div>
      </div>
    );
  }
}
