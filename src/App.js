import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Bookshelf from './components/Bookshelf';
import SearchPage from './components/SearchPage';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksRead: [],
    booksReading: [],
    booksWishlist: [],
  };

  componentDidMount() {
    this.handelFetch();
  }

  handelFetch = async (e) => {
    try {
      const bookdata = await BooksAPI.getAll();
      this.setState({ books: await bookdata });
      this.setShelfs();
    } catch {
      console.error('error');
    }
  };
  setShelfs = () => {
    this.setState({
      booksRead: this.state.books.filter((book) => {
        return book.shelf === 'read';
      }),
      booksReading: this.state.books.filter((book) => {
        return book.shelf === 'currentlyReading';
      }),
      booksWishlist: this.state.books.filter((book) => {
        return book.shelf === 'wantToRead';
      }),
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
    this.setShelfs();
    console.log('hi');
  };
  searchToggler = () => this.setState({ showSearchPage: false });
  render() {
    console.log(this.state.books);
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          <SearchPage searchToggler={this.searchToggler} />
        ) : (
          <div className='list-books'>
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            <div className='list-books-content'>
              <div>
                <Bookshelf
                  handelBooksUpdate={this.handelBooksUpdate}
                  name='Currently Reading'
                  books={this.state.booksReading}
                />
                <Bookshelf
                  handelBooksUpdate={this.handelBooksUpdate}
                  name='Want to Read'
                  books={this.state.booksWishlist}
                />
                <Bookshelf
                  handelBooksUpdate={this.handelBooksUpdate}
                  name='Read'
                  books={this.state.booksRead}
                />
              </div>
            </div>
            <div className='open-search'>
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
