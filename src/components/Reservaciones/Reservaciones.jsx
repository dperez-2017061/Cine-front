import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { url } from '../../GlobalUrl'
import './Reservaciones.css'

export const Reservaciones = ({ token, name }) => {
    const [invoices, setInvoices] = useState([])
    const headers = {
        headers: {
            'Authorization': token
        }
    }

    useEffect(() => {
        axios.get(url + 'invoice/getInvoices', headers)
            .then(res => {
                console.log(res.data)
                setInvoices(res.data.invoices)
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
            })
    }, [])


    return (
        <div style={{ minHeight: '93.6vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }} >

            <div className="wrap cf">
                <h1 className="projTitle">Mis reservaciones<span>-{name}</span></h1>
                <div className="cart">
                    <ul className="cartWrap">
                        {
                            invoices.map((invoice, index) => {
                                if (index % 2 === 0) {
                                    return <li key={index} className="items odd" >
                                        <img src={invoice.ticket.imagen} alt={invoice.ticket.movie} style={{
                                            height: '25em'
                                        }} />
                                        <div className="infoWrap">
                                            <div className="cartSection">
                                                <p className="itemNumber">{invoice.ticket.movie}</p>
                                                <h3>Sala: {invoice.ticket.sala} Hora: {invoice.ticket.hora}</h3>
                                                <h3>Asientos: {invoice.ticket.asientos}</h3>

                                                <p className='marg'> <input type="text" className="qty" value={invoice.cantidad} readOnly /> x Q{invoice.subTotal}</p>

                                                <p className="stockStatus">{invoice.total}</p>
                                            </div>
                                        </div>
                                    </li>
                                } else {
                                    return <li key={index} className="items even">
                                        <img src={invoice.ticket.imagen} alt={invoice.ticket.movie} style={{
                                            height: '25em'
                                        }} />
                                        <div className="infoWrap">
                                            <div className="cartSection">
                                                <p className="itemNumber">{invoice.ticket.movie}</p>
                                                <h3>Sala: {invoice.ticket.sala} Hora: {invoice.ticket.hora}</h3>
                                                <h3>Asientos: {invoice.ticket.asientos}</h3>

                                                <p className='marg'> <input type="text" className="qty" value={invoice.cantidad} readOnly /> x Q{invoice.subTotal}</p>

                                                <p className="stockStatus">{invoice.total}</p>
                                            </div>
                                        </div>
                                    </li>
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
