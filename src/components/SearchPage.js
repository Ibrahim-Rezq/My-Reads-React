import React, { useState } from 'react'
import Book from './Book'
import * as BooksAPI from '../BooksAPI'
import Nav from './Nav'

const SearchPage = ({ books, handelBooksUpdate }) => {
    const [currBooks, setCurrBooks] = useState([])
    const handelChange = async (e) => {
        e.persist()
        try {
            if (e.target.value) {
                const res = await BooksAPI.search(e.target.value)
                if (e.target.value) {
                    if (res.length > 0) {
                        const finalBooks = res.map((resBook) => {
                            for (const book of books) {
                                if (book.id === resBook.id) {
                                    return book
                                }
                            }
                            return resBook
                        })
                        setCurrBooks([...finalBooks])
                    }
                } else {
                    setCurrBooks([])
                }
            } else {
                setCurrBooks([])
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='search-books'>
            <Nav handelChange={handelChange} />
            <div className='search-books-results'>
                <ul className='row justify-content-center list-unstyled m-4 gab-2'>
                    {!currBooks.error &&
                        currBooks.map((book) => {
                            const { title, authors, imageLinks } = book
                            return (
                                <>
                                    {title &&
                                        authors &&
                                        imageLinks &&
                                        imageLinks.hasOwnProperty(
                                            'smallThumbnail'
                                        ) && (
                                            <li
                                                className='col-3 py-4'
                                                key={book.id}
                                            >
                                                <Book
                                                    handelBooksUpdate={
                                                        handelBooksUpdate
                                                    }
                                                    book={book}
                                                />
                                            </li>
                                        )}
                                </>
                            )
                        })}
                </ul>
            </div>
        </div>
    )
}
export default SearchPage
