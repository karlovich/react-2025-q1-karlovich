import { Component } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchInput: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  onButtonClick = () => {
    this.props.onSearch(this.state.searchInput);
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchInput: e.target.value,
    });
  };

  render() {
    return (
      <div className="search-bar">
        <input
          onChange={this.onInputChange}
          className="search-input"
          type="text"
          placeholder="Search..."
        />
        <button onClick={this.onButtonClick} className="search-button">
          Search
        </button>
      </div>
    );
  }
}
