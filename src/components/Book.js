import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';
import PropTypes from 'prop-types';

export default class Book extends Component {
  state = {
    shelf: this.props.book.shelf,
  };

  componentDidMount() {}
  handelUpdate = async (e) => {
    console.log('hi');
    e.persist();
    try {
      this.props.handelBooksUpdate(this.props.book.id, e.target.value);
      await BooksAPI.update(this.props.book, e.target.value);
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { title, authors, imageLinks } = this.props.book;
    return (
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${imageLinks.smallThumbnail})`,
            }}
          />
          <div className='book-shelf-changer'>
            <select onChange={this.handelUpdate} defaultValue={'move'}>
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{title}</div>
        <div className='book-authors'>{authors}</div>
        {/* {authors.map((auther) => {
          return (
            <div key={auther} className='book-authors'>
              {auther}
            </div>
          );
        })} */}
      </div>
    );
  }
}
Book.propTypes = {
  book: PropTypes.object.isRequired,
};
Book.defaultProps = {
  book: {
    title: 'PropTypes.string.isRequired',
    shelf: 'PropTypes.string.isRequired',
    authors: 'PropTypes.string.isRequired',
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
    },
  },
};
