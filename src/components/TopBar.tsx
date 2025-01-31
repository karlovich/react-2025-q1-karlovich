import { Component } from 'react';
import { SearchInput } from './SearchInput';
import { SearchButton } from './SearchButton';

export class TopBar extends Component {
  render() {
    return (
      <div>
        <div>
          <h1>TopBar</h1>
        </div>
        <div>
          <SearchInput />
          <SearchButton />
        </div>
      </div>
    );
  }
}
