import React, { Component } from 'react';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

export default class SearchPage extends Component {
  state = {
    books: [],
  };
  handelChange = async (e) => {
    try {
      if (e.target.value) {
        console.log(e.target.value);
        const res = await BooksAPI.search(e.target.value);
        this.setState({ books: res });
      } else {
        this.setState({ books: [] });
        console.log('empty');
      }
    } catch (e) {
      console.log(e);
    }
  };
  handelSerach = (e) => {};
  render() {
    console.log('hi');
    const books = this.state.books;
    const searchToggler = this.props.searchToggler;
    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <button className='close-search' onClick={searchToggler}>
            Close
          </button>
          <div className='search-books-input-wrapper'>
            <input
              type='text'
              onChange={this.handelChange}
              placeholder='Search by title or author'
            />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {!books.error &&
              books.map((book) => {
                return (
                  <li key={book.id}>
                    <Book
                      handelBooksUpdate={this.props.handelBooksUpdate}
                      book={book}
                    />
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}
