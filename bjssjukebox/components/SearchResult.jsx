import React from "react";

const SearchResult = props => {
  const { result } = props;

  /**
   * 
   * <div className="search-result-card">
        <span>
          <img src={result.album.images[2].url} />
          {result.name +
            ", " +
            result.album.name +
            ", " +
            result.artists[0].name}
        </span>
      </div>
   */

  return (
    <React.Fragment>
      <div
        className={
          result.explicit
            ? "search-result-card border-danger"
            : "search-result-card"
        }
      >
        <img
          className="card-img-top"
          src={result.album.images[1].url}
          alt="Card image cap"
        />
        <div
          className={result.explicit ? "card-body text-danger" : "card-body"}
        >
          <h4 className="card-title">{result.name}</h4>
          <h5 className="card-title">{result.album.name}</h5>
          <h5 className="card-title">{result.artists[0].name}</h5>
          <a href="#" className="btn btn-primary">
            Add to queue
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchResult;
