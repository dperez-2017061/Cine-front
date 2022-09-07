import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const Navbar = ({ token, setToken, children }) => {
    const handleClick = () => {
        localStorage.clear()
        Swal.fire({
            title: 'Sesión cerrada satisfactoriamente',
            icon: 'success',
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
        })
        setToken()
    }
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: '#141414', fontSize: 18, padding: '8px 50px' }}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/home' style={{ color: '#00f2fe', fontSize: 24, paddingRight: 50 }}>Cinepolis</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/home">Home</Link>
                            </li>
                            {
                                token ?
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/reservations">Mis reservaciones</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link onClick={handleClick} className="nav-link active" to="/home">Cerrar Sesión</Link>
                                        </li>
                                    </>
                                    :
                                    <li className="nav-item">
                                        <Link className="nav-link active" to="/login&register">Login/register</Link>
                                    </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            {children}
        </>

    )
}
