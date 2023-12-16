import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './navbar.css';
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg Navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><FontAwesomeIcon icon="fa-solid fa-graduation-cap" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <FontAwesomeIcon icon="fa-solid fa-bars" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link " to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to='/students'>Students</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to='/courses'>Courses</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/registerCourses'>Enrollment</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link RegisterBtn" to='/register'>Sign up</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link  LoginBtn" to='/login'>Sign in</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default Navbar