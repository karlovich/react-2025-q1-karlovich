import { Component } from 'react';
import { Card } from './Card';

interface SearchResultsProps {
  searchTerm: string;
}

interface Character {
  name: string;
  gender: string;
}

interface SearchResultsState {
  count: number;
  results: Character[];
}

export class SearchResults extends Component<
  SearchResultsProps,
  SearchResultsState
> {
  state: SearchResultsState = {
    count: 0,
    results: [],
  };

  componentDidMount() {
    this.fetchData(this.props.searchTerm);
  }

  componentDidUpdate(prevProps: SearchResultsProps) {
    if (prevProps.searchTerm != this.props.searchTerm) {
      this.fetchData(this.props.searchTerm);
    }
  }

  async fetchData(text: string) {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${text}`
    );

    const data = await response.json();

    this.setState({
      count: data.count,
      results: data.results,
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>Search Results Area. Total Count: {this.state.count}</h1>
        </div>
        <div>
          {this.state.results.map((character, index) => {
            if (character) return <Card key={index} />;
          })}
        </div>
      </div>
    );
  }
}
