import * as BooksAPI from '../BooksAPI';

const handelBookUpdate = async (e) => {
  console.log('hi');
  e.persist();
  try {
    this.props.handelBooksUpdate(this.props.book.id, e.target.value);
    await BooksAPI.update(this.props.book, e.target.value);
  } catch (e) {
    console.log(e);
  }
};
export default handelBookUpdate;
