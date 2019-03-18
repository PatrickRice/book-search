import React from "react";
import "./style.css";
import DeleteBtn from "../DeleteBtn";

function SavedBooks(props) {
  return (
    <ul className="list-group search-results">
      {props.books.map(result => (
        <li key={result.id} className="list-group-item">
          <img alt="Book" src={result.volumeInfo.imageLinks.thumbnail} className="img-fluid" />
          <h1>{result.volumeInfo.title}</h1> 
          <h3>{result.volumeInfo.subtitle}</h3>
          <p>by: {result.volumeInfo.authors}</p>
          <p>Description: {result.volumeInfo.description}</p>
          <DeleteBtn />
        </li>
      ))}
    </ul>
  );
}

export default SavedBooks;