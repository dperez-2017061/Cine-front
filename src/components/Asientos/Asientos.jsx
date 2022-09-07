import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { url } from '../../GlobalUrl';
import { Asiento } from './Asiento/Asiento';
import './Asientos.css'

export const Asientos = ({ token }) => {
    const { movieId, numero } = useParams()
    const [seats, setSeats] = useState([])
    const [indexes, setIndexes] = useState([])
    const navigate = useNavigate()

    const handleClick = () => {
        const headers = {
            headers: {
                'Authorization': token
            }
        }
        axios.put(url + 'movie/buyTickets/' + movieId + '/' + numero, { seats: indexes }, headers)
            .then(res => {
                Swal.fire({
                    title: res.data.message,
                    icon: 'success',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                })
                axios.post(url + 'invoice/createInvoice/' + movieId + '/' + numero, { seats: indexes }, headers)
                    .then(res => {
                        navigate('/invoice/' + res.data.saveInvoice._id)
                    })
                    .catch(err => {
                    })
                navigate('/invoice')
            })
            .catch(err => {
                Swal.fire({
                    title: err.response.data.message,
                    icon: 'error',
                    position: 'center',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                })
                setIndexes([])
            })
    }
    useEffect(() => {
        axios.get(url + 'movie/getMovie/' + movieId)
            .then(res => {
                const sala = res.data.salas.filter(sala => sala.numero === Number(numero))
                setSeats(sala[0].asientos)
            })
    }, [])

    return (
        <div style={{ minHeight: '93.6vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} >
            <div className='contenedor'>
                <div className='asientos'> {
                    seats.map((seat, index) => (seat.map((object, i) => {
                        return <Asiento key={
                            index + i
                        }
                            index={index}
                            i={i}
                            object={object}
                            indexes={indexes}
                            setIndexes={setIndexes} />
                    })))
                }
                </div>
                <button onClick={handleClick} className='mt-4 btn btn-success'>Comprar boletos</button>

            </div>
        </div>
    )
}
