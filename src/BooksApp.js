import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import Bookshelf from './components/Bookshelf'
import SearchPage from './components/SearchPage'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import Nav from './components/Nav'

const BooksApp = () => {
    const [books, setBooks] = useState([])
    const [shelfs] = useState([
        {
            name: 'Currently Reading',
            shelf: 'currentlyReading',
        },
        {
            name: 'Want to Read',
            shelf: 'wantToRead',
        },
        {
            name: 'Read',
            shelf: 'read',
        },
    ])

    useEffect(() => {
        handelFetch()
    }, [])

    const handelFetch = async (e) => {
        try {
            const bookdata = await BooksAPI.getAll()
            setBooks(await bookdata)
        } catch {
            console.error('error')
        }
    }

    const handelFilter = (shelf) => {
        return books.filter((book) => {
            return book.shelf === shelf
        })
    }

    const handelBooksUpdate = (book, currShelf) => {
        const fillterdBooks = books.filter((aBook) => {
            return aBook.id !== book.id
        })
        updateBook(book, currShelf)
        book.shelf = currShelf
        setBooks([...fillterdBooks, book])
    }

    const updateBook = async (book, shelf) => {
        try {
            await BooksAPI.update(book, shelf)
        } catch (e) {
            console.error(e)
        }
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <div className=''>
                    <Nav notShow />
                    {shelfs.map((shelf, i) => {
                        return (
                            <div
                                className={`py-4 ${
                                    i % 2 === 0 ? '' : 'bg-light'
                                }`}
                            >
                                <div className={`container`}>
                                    <Bookshelf
                                        key={shelf.name}
                                        handelBooksUpdate={handelBooksUpdate}
                                        name={shelf.name}
                                        books={handelFilter(shelf.shelf)}
                                    />
                                </div>
                            </div>
                        )
                    })}
                    <div className='open-search'>
                        <Link to='/search'>
                            <button>Add a book</button>
                        </Link>
                    </div>
                </div>
            ),
        },
        {
            path: '/search',
            element: (
                <SearchPage
                    books={books}
                    handelBooksUpdate={handelBooksUpdate}
                    // searchToggler={searchToggler}
                />
            ),
        },
        {
            path: '/*',
            element: <h1>Error</h1>,
        },
    ])

    return <RouterProvider router={router} />
}

export default BooksApp
