import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SavedBooks from "../components/SavedBooks";
import DeleteBtn from "../components/DeleteBtn";
import { List, ListItem } from "../components/List";

class Detail extends Component {
  state = {
    books: {}
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc

  loadBooks() {
    API.getBooks()
    .then(res => this.setState({ books: res.data }))
    .catch(err => console.log(err));
  }

  componentDidMount() {
    this.loadBooks();
  }

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
               <Row>
          <Col size="md-9">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                  <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  <img alt="Book" src={book.image} className="img-fluid" />
          <a href={book.link}><h1>{book.title}</h1> 
          <h3>{book.subtitle}</h3></a>
          <p>by: {book.author}</p>
          <p>Description: {book.description}</p>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Detail;
