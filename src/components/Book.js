import React, { useState } from 'react'

const Book = ({ book, shelf, handelBooksUpdate }) => {
    const [currShelf] = useState(book.shelf || shelf)

    const handelUpdate = async (e) => {
        try {
            handelBooksUpdate(book, e.target.value)
        } catch (e) {
            console.error(e)
        }
    }
    const { title, authors, imageLinks } = book
    return (
        <div className='text-center h-100 d-flex flex-column justify-content-between'>
            <div>
                <div
                    className='m-auto '
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imageLinks.smallThumbnail})`,
                    }}
                />
                <div>
                    <select
                        class='form-select mt-2'
                        onChange={handelUpdate}
                        defaultValue={currShelf || 'none'}
                    >
                        <option value='move' disabled>
                            Move to...
                        </option>
                        <option value='currentlyReading'>
                            Currently Reading
                        </option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='read'>Read</option>
                        <option value='none'>None</option>
                    </select>
                </div>
                <div className='mt-2'>{title}</div>
            </div>
            <div className='d-flex justify-content-evenly'>
                {authors.map((auther) => {
                    return <div key={auther}>{auther}</div>
                })}
            </div>
        </div>
    )
}

export default Book
