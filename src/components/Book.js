import React, { Component } from 'react';
import * as BooksAPI from '../BooksAPI';

export default class Book extends Component {
  state = {
    shelf: this.props.book.shelf,
  };

  componentDidMount() {}
  handelUpdate = async (e) => {
    try {
      await BooksAPI.update(this.props.book, e.target.value);
      this.setState({ shelf: e.target.value });
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { title, shelf, authors, imageLinks } = this.props.book;
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
            <select onChange={this.handelUpdate}>
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
        {authors.map((auther) => {
          return (
            <div key={auther} className='book-authors'>
              {auther}
            </div>
          );
        })}
      </div>
    );
  }
}
