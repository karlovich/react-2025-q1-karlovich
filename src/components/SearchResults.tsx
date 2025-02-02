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
      throw new Error('May the 4th be with u');
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
      <div className="p-4">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-black">
            {this.state.count > 0
              ? `Search of the Galactic Republic found ${this.state.count} creatures`
              : 'No Creatures Found'}
          </h1>
        </div>
        <div>
          {this.state.loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {this.state.results.map((character, index) => (
                <Card key={index} character={character} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
