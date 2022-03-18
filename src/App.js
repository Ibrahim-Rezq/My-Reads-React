import React from 'react';
import * as BooksAPI from './BooksAPI';
import './css/App.css';
import Bookshelf from './components/Bookshelf';
import SearchPage from './components/SearchPage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: [
      {
        name: 'Currently Reading',
        shelf: 'currentlyReading',
      },
      {
        name: 'Want to Read',
        shelf: 'wantToRead',
      },
      {
        name: 'Read',
        shelf: 'read',
      },
    ],
  };

  componentDidMount() {
    this.handelFetch();
  }

  handelFetch = async (e) => {
    try {
      const bookdata = await BooksAPI.getAll();
      this.setState({ books: await bookdata });
    } catch {
      console.error('error');
    }
  };

  handelFilter = (shelf) => {
    return this.state.books.filter((book) => {
      return book.shelf === shelf;
    });
  };

  handelBooksUpdate = (book, currShelf) => {
    const fillterdBooks = this.state.books.filter((aBook) => {
      return aBook.id !== book.id;
    });
    this.updateBook(book, currShelf);
    book.shelf = currShelf;
    this.setState({ books: [...fillterdBooks, book] });
  };

  updateBook = async (book, shelf) => {
    try {
      await BooksAPI.update(book, shelf);
    } catch (e) {
      console.error(e);
    }
  };

  handelShelfState = () => {};

  render() {
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/search'>
              <SearchPage
                books={this.state.books}
                handelBooksUpdate={this.handelBooksUpdate}
                searchToggler={this.searchToggler}
              />
            </Route>
            <Route exact path='/'>
              <div className='list-books'>
                <div className='list-books-title'>
                  <h1>MyReads</h1>
                </div>
                <div className='list-books-content'>
                  <div>
                    {this.state.shelfs.map((shelf, i) => {
                      return (
                        <Bookshelf
                          key={shelf.name}
                          handelBooksUpdate={this.handelBooksUpdate}
                          name={shelf.name}
                          books={this.handelFilter(shelf.shelf)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className='open-search'>
                  <Link to='/search'>
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            </Route>
            <Route path='*'>
              <h1>Error</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default BooksApp;
