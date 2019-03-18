import React from "react";
import "./style.css";

function SearchResults(props) {
  return (
    <ul className="list-group search-results">
      {props.books.map(result => (
        <li key={result.id} className="list-group-item">
          <img alt="Book" src={result.volumeInfo.imageLinks.thumbnail} className="img-fluid" />
          <h1>{result.volumeInfo.title}</h1> 
          <h3>{result.volumeInfo.subtitle}</h3>
          <p>by: {result.volumeInfo.authors}</p>
          <p>Description: {result.volumeInfo.description}</p>
          <a href={result.volumeInfo.previewLink}>
          <button className="btn btn-outline-info" {...props} type="button" tabIndex="0">
          View
    </button></a>
    { !props.saved.includes(result.id) ? 
    <button className='btn btn-outline-success' dataValue={result.id} {...props} type="button" tabIndex="1" style={{ marginLeft: '10px'}} onClick={props.onClick}>
          Save
    </button> : <button className="btn btn-light" disabled {...props} type="button" tabIndex="1" style={{ marginLeft: '10px'}}>
          Saved
    </button>
    }
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;

// onClick={() => this.deleteBook(book._id)}