import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { url } from '../../GlobalUrl'
import './Invoice.css'

export const Invoice = ({ token }) => {

    const { invoiceId } = useParams()
    const [invoice, setInvoice] = useState()
    const headers = {
        headers: {
            'Authorization': token
        }
    }

    useEffect(() => {
        axios.get(url + 'invoice/getInvoice/' + invoiceId, headers)
            .then(res => {
                setInvoice(res.data.invoice)
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '93.6vh', fontSize: 24 }}>
            {invoice &&
                <div className="cont">
                    <div className="row">
                        <div className="span4">
                            <img src={require('../../shared/img/Logo.png')} className="img-rounded logo" />
                        </div>
                        <div className="span4 well mt-4">
                            <table className="invoice-head">
                                <tbody>
                                    <tr>
                                        <td className="pull-right"><strong>Nombre</strong></td>
                                        <td>{invoice.usuario.nombre} {invoice.usuario.apellido}</td>
                                    </tr>
                                    <tr>
                                        <td className="pull-right"><strong>Identificación</strong></td>
                                        <td>{invoice.usuario.identificación}</td>
                                    </tr>
                                    <tr>
                                        <td className="pull-right"><strong>Factura #</strong></td>
                                        <td>{invoice.numero}</td>
                                    </tr>
                                    <tr>
                                        <td className="pull-right"><strong>Fecha</strong></td>
                                        <td>{invoice.date}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="span8">
                            <h2>Factura</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="span8 well invoice-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Película</th>
                                        <th>Asientos</th>
                                        <th>Sala</th>
                                        <th>Hora</th>
                                        <th>SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{invoice.cantidad}</td>
                                        <td>{invoice.ticket.movie}</td>
                                        <td>{invoice.ticket.asientos}</td>
                                        <td>{invoice.ticket.sala}</td>
                                        <td>{invoice.ticket.hora}</td>
                                        <td>{invoice.subTotal}</td>
                                    </tr>
                                    <tr style={{ border: 'none' }}><td colSpan="5" style={{ border: 'none' }} ></td></tr>
                                    <tr style={{ border: 'none' }}>
                                        <td colSpan="3" style={{ border: 'none' }}>&nbsp;</td>
                                        <td style={{ borderColor: '#dee2e6', borderStyle: 'solid', borderWidth: '1px' }}><strong>Total</strong></td>
                                        <td style={{ borderColor: '#dee2e6', borderStyle: 'solid', borderWidth: '1px' }}><strong>{invoice.total}</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="row">
                        <div className="span8 well invoice-thank">
                            <h5 style={{ textAlign: 'center' }}>!Gracias por preferirnos!</h5>
                        </div>
                    </div>
                </div>
            }
        </div >
    )
}
