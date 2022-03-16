import React from 'react';
import * as BooksAPI from './BooksAPI';
import './css/App.css';
import Bookshelf from './components/Bookshelf';
import SearchPage from './components/SearchPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
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

  handelBooksUpdate = (id, currShelf) => {
    const fillterdBooks = this.state.books.filter((book) => {
      return book.id !== id;
    });
    const theBook = this.state.books.filter((book) => {
      return book.id === id;
    })[0];
    theBook.shelf = currShelf;
    this.setState({ books: [...fillterdBooks, theBook] });
    console.log(this.state.books);
  };

  searchToggler = () => this.setState({ showSearchPage: false });
  render() {
    console.log(this.state.books);
    return (
      <Router>
        <div className='app'>
          <Switch>
            <Route exact path='/search'>
              <SearchPage
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
                    {this.state.shelfs.map((shelf) => {
                      return (
                        <Bookshelf
                          handelBooksUpdate={this.handelBooksUpdate}
                          name={shelf.name}
                          books={this.handelFilter(shelf.shelf)}
                        />
                      );
                    })}
                  </div>
                </div>
                <div className='open-search'>
                  <button
                    onClick={() => this.setState({ showSearchPage: true })}>
                    Add a book
                  </button>
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
