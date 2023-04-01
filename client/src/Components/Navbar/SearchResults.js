import React, { Component } from 'react';
export class SearchResults extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="search">
          <input type="text" className="search-box" />
          <input type="submit" value="" className="search-btn" />
        </div>
      </React.Fragment>
    );
  }
}
export default SearchResults;