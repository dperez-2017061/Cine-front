import React from 'react'
import './Película.css'
import { Link } from 'react-router-dom'

export const Película = ({ movie, token }) => {

    return (
        <div className='pelicula'>
            {token ?
                <>
                    <img className='movie transition' src={movie.imagen} alt={movie.nombre} />
                    <div className='horas'>
                        <Link className='btn horario' to={'/seats/' + movie._id + '/1'}>8:30</Link>
                        <Link className='btn horario' to={'/seats/' + movie._id + '/2'}>10:00</Link>
                        <Link className='btn horario' to={'/seats/' + movie._id + '/3'}>12:30</Link>
                    </div>
                </>
                :
                <>
                    <img className='movie' src={movie.imagen} alt={movie.nombre} />
                    <div className='horas'>
                        <Link className='btn horario' to={'/login&register/' + movie._id + '/1'}>8:30</Link>
                        <Link className='btn horario' to={'/login&register/' + movie._id + '/2'}>10:00</Link>
                        <Link className='btn horario' to={'/login&register/' + movie._id + '/3'}>12:30</Link>
                    </div>
                </>
            }
        </div>
    )
}
