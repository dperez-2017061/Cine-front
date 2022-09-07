import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Asientos } from '../Asientos/Asientos'
import { Home } from '../Home/Home'
import { Invoice } from '../Invoice/Invoice'
import { Login_Register } from '../Login_Register/Login_Register'
import { Navbar } from '../Navbar/Navbar'
import { Reservaciones } from '../Reservaciones/Reservaciones'

export const Main = () => {
    const localToken = localStorage.getItem('token')
    const localName = localStorage.getItem('nombre')
    const [token, setToken] = useState((localToken === null || localToken === undefined) ? '' : JSON.parse(localToken))
    const [name, setName] = useState((localName === null || localName === undefined) ? '' : JSON.parse(localName))
    return (
        <div>
            <Navbar token={token} setToken={setToken}>
                <Routes>
                    <Route path='home' element={<Home token={token} />} />
                    <Route path='/seats/:movieId/:numero' element={
                        token ?
                            <Asientos token={token} />
                            :
                            <Navigate to='/home' />
                    } />
                    <Route path='login&register/:movieId/:numero' element={
                        !token ?
                            <Login_Register setToken={setToken} setName={setName}/>
                            :
                            <Navigate to='/home' />
                    } />
                    <Route path='login&register' element={
                        !token ?
                            <Login_Register setToken={setToken} setName={setName} />
                            :
                            <Navigate to='/home' />
                    } />
                    <Route path='invoice/:invoiceId' element={
                        token ?
                            <Invoice token={token} />
                            :
                            <Navigate to='/home' />
                    } />
                    <Route path='reservations' element={
                        token ?
                            <Reservaciones token={token} name={name} />
                            :
                            <Navigate to='/home' />
                    } />
                    <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
            </Navbar>
        </div>
    )
}
