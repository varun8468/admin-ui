import React from 'react'

const Pagination = ({ usersPerPage, totalUsers }) => {
    const pageNumbers = [];
    for( let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++){
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className=''>
            {pageNumbers.map(number => (
                <li key={number}>
                    <button>{number}</button>
                </li>
            ))}
        </ul>
    </nav>
  )
}

export default Pagination