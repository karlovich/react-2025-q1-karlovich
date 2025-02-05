import { Component } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchInput: string;
}

export class SearchBar extends Component<SearchBarProps, SearchBarState> {
  state: SearchBarState = {
    searchInput: this.props.searchTerm,
  };

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
      <div className="flex space-x-2 justify-center w-full max-w-md mx-auto">
        <input
          onChange={this.onInputChange}
          className="border border-black p-2 rounded bg-white text-black w-full"
          type="text"
          placeholder="Search..."
          value={this.state.searchInput}
        />
        <button
          onClick={this.onButtonClick}
          className="bg-black text-white p-2 rounded cursor-pointer"
        >
          Search
        </button>
      </div>
    );
  }
}
