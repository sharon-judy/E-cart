import { current } from '@reduxjs/toolkit';
import React from 'react'

function Pagination({ totalProducts, cardPerPage, setCurrentPage, currentPage }) {
    const pages = []
    console.log(totalProducts, cardPerPage);


    for (let i = 1; i <= Math.ceil(totalProducts / cardPerPage); i++) {

        pages.push(i)
    }


    const handleprev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }


    const handlenext = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <>
            <div className='d-flex text-align-center justify-content-center'>
                <button className='btn me-1' onClick={handleprev} disabled={currentPage == 1}><i className="fa-solid fa-arrow-left text-dark"></i></button>

                {
                    pages?.map(page => (
                        <button onClick={() => { setCurrentPage(page) }} className={`btn btn-light me-3 ${currentPage == page ? `active` : ''} `} >{page}</button>
                    ))
                }

                <button onClick={handlenext} disabled={currentPage == 5} className='btn ms-1'><i className="fa-solid fa-arrow-right text-dark"></i></button>
            </div>

        </>
    )
}

export default Pagination