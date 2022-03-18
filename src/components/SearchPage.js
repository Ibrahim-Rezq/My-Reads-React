import React, { Component } from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';

export default class SearchPage extends Component {
  state = {
    books: [],
  };
  // categories
  // this.props.books
  handelChange = async (e) => {
    e.persist();
    try {
      if (e.target.value) {
        const res = await BooksAPI.search(e.target.value);
        if (e.target.value) {
          if (res.length > 0) {
            const finalBooks = res.map((resBook) => {
              for (const book of this.props.books) {
                if (book.id === resBook.id) {
                  return book;
                }
              }
              return resBook;
            });
            this.setState({
              books: [...finalBooks],
            });
          }
        } else {
          this.setState({ books: [] });
        }
      } else {
        this.setState({ books: [] });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handelSerach = (e) => {};
  render() {
    const books = this.state.books;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'>
            <button className='close-search'>Close</button>
          </Link>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              onKeyUp={this.handelChange}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {!books.error &&
              books.map((book) => {
                const { title, authors, imageLinks } = book;
                return (
                  <li key={book.id}>
                    {title &&
                      authors &&
                      imageLinks &&
                      imageLinks.hasOwnProperty('smallThumbnail') && (
                        <Book
                          handelBooksUpdate={this.props.handelBooksUpdate}
                          book={book}
                        />
                      )}
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}
