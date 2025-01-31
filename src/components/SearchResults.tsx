import { Component } from 'react';
import { Card } from './Card';

interface SearchResultItem {
  id: number;
  name: string;
  description: string;
}

export class SearchResults extends Component {
  searchResultItems: SearchResultItem[] = [
    {
      id: 1,
      name: 'Item 1',
      description: 'Description for item 1',
    },
    {
      id: 2,
      name: 'Item 2',
      description: 'Description for item 2',
    },
    {
      id: 3,
      name: 'Item 3',
      description: 'Description for item 3',
    },
  ];

  render() {
    return (
      <div>
        <div>
          <h1>Search Results Area</h1>
        </div>
        <div>
          {this.searchResultItems.map((item) => {
            return <Card key={item.id} />;
          })}
        </div>
      </div>
    );
  }
}
