import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import SearchResults from "../components/SearchResults";

class Books extends Component {
  state = {
    books: [],
    savedBooks: [],
    title: "",
    author: "",
    description: "",
    error: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        const results = res.data;
        const googleIds = results.map(id => id.googleId);
        this.setState({ savedBooks: googleIds })
      })
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({ books: [] });
    let noSpaces = this.state.title.replace(/ /g, '+');
    console.log("No Spaces: " + noSpaces);
      API.getBookByTitle(noSpaces)
      .then(res => {
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        this.setState({ books: res.data.items, error: "" });
        // console.log("Res.data: " + JSON.stringify(res.data.items[0]));
      })
      .catch(err => this.setState({ error: err.message }))
  }

  handleBtnClick = event => {
    // Get the data-value of the clicked button
    const btnType = event.target.attributes.getNamedItem("dataValue").value;

    console.log("btnType: " + btnType);
    console.log("Book 1: " + this.state.books[1].id);

    for (let i = 0; i<this.state.books.length; i++) {
      if (btnType === this.state.books[i].id) {
        API.saveBook({
          googleId: this.state.books[i].id,
          title: this.state.books[i].volumeInfo.title,
          subtitle: this.state.books[i].volumeInfo.subtitle,
          author: this.state.books[i].volumeInfo.authors,
          description: this.state.books[i].volumeInfo.description,
          image: this.state.books[i].volumeInfo.imageLinks.thumbnail,
          link: this.state.books[i].volumeInfo.previewLink,
          isSaved: true
        })
          .then(res => this.loadBooks())
          .catch(err => console.log(err));
    }
  }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-9">
            <Jumbotron>
              <h1>Search for Books by Title</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              /> */}
              <FormBtn
                disabled={!(this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form><br /><br />
            <>
            <SearchResults books={this.state.books} saved={this.state.savedBooks} onClick={this.handleBtnClick} />
            </>
          </Col>
          {/* <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */}
        </Row>
      </Container>
    );
  }
}

export default Books;
