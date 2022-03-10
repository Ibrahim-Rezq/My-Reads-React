import React from 'react';
import Book from './Book';

export default class Bookshelf extends React.Component {
  render() {
    const books = this.props.books;
    const name = this.props.name;
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{name}</h2>
        <div className='bookshelf-books'>
          {!books ? (
            <div>
              <p>Loading...</p>
            </div>
          ) : (
            <ol className='books-grid'>
              {books.map((book) => {
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
          )}
        </div>
      </div>
    );
  }
}
