import React, { useState } from 'react'

const Search = ({ history }) => {

    const [keyword, setKeyword] = useState('');//declare keyword and assign it to empty string

    const searchHandler = (e) => {//after form submit call this
        e.preventDefault()//prevents the default form submission behavior

        if (keyword.trim()) {//if the keyword is not empty
            history.push(`/search/${keyword}`)//navigate to search page with search keyword
        } else {
            history.push('/')//if keyword is empty/not match---->Home Page
        }
    }

    return (
        <form onSubmit={searchHandler} >
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    onChange={(e) => setKeyword(e.target.value)}//updates the value of keyword ---> user type new value
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Search
