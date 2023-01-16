import React from 'react'
import Book from './Book'

const Bookshelf = ({ books, name, handelBooksUpdate }) => {
    return (
        <>
            <h2 className='display-4'>{name}</h2>
            <div className=''>
                {!books ? (
                    <div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <ul className='row justify-content-center list-unstyled my-4'>
                        {books.map((book) => {
                            return (
                                <li
                                    className='col-3'
                                    style={{ hight: '24rem' }}
                                    key={book.id}
                                >
                                    <Book
                                        handelBooksUpdate={handelBooksUpdate}
                                        book={book}
                                    />
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </>
    )
}
export default Bookshelf
