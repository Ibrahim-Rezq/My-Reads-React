import React from 'react'
import { Link } from 'react-router-dom'

function Nav({ handelChange, notShow }) {
    return (
        <nav class='navbar navbar-light bg-light' style={{ height: '4rem' }}>
            <div class='container-fluid'>
                <Link class='navbar-brand' to='/'>
                    My React Book Library
                </Link>
                <form
                    class={`d-flex w-50 ${notShow || 'me-auto'}`}
                    role='search'
                >
                    {notShow || (
                        <input
                            class='form-control me-2'
                            type='search'
                            aria-label='Search'
                            onKeyUp={handelChange}
                            placeholder='Search by title or author'
                        />
                    )}
                    <Link
                        class={`btn btn-outline-success ${
                            notShow && 'ms-auto'
                        }`}
                        to='/search'
                    >
                        {notShow ? 'Go To Search' : 'Search'}
                    </Link>
                </form>
            </div>
        </nav>
    )
}

export default Nav
