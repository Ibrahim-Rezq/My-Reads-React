import React, { Component } from 'react';

export default class Book extends Component {
  state = {
    shelf: this.props.book.shelf || this.props.shelf,
  };

  componentDidMount() {}
  handelUpdate = async (e) => {
    try {
      this.props.handelBooksUpdate(this.props.book, e.target.value);
    } catch (e) {
      console.error(e);
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
            <select
              onChange={this.handelUpdate}
              defaultValue={this.state.shelf || 'none'}>
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
