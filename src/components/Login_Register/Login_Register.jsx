import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { url } from '../../GlobalUrl'
import './Login_Register.css'

export const Login_Register = ({ setToken, setName }) => {

  const { movieId, numero } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState({
    usuario: '',
    contraseña: '',
    nombre: '',
    apellido: '',
    identificación: '',
    correo: '',
    teléfono: 0,
  })

  const [params, setParams] = useState({
    usuario: '',
    contraseña: ''
  })

  const signUp = useRef()
  const signIn = useRef()
  const container = useRef()

  useEffect(() => {
    signUp.current.addEventListener("click", () =>
      container.current.classList.remove("right-panel-active")
    )

    signIn.current.addEventListener("click", () =>
      container.current.classList.add("right-panel-active")
    )
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setData({
      ...data,
      [name]: value
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    axios.post(url + 'user/register', data)
      .then(res => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        axios.post(url + 'user/login', {
          usuario: data.usuario,
          contraseña: data.contraseña
        }).then(res => {
          localStorage.setItem('token', JSON.stringify(res.data.token))
          localStorage.setItem('nombre', JSON.stringify(data.usuario))
          setToken(res.data.token)
          setName(data.usuario)
          if (movieId) {
            navigate('/seats/' + movieId + '/' + numero, { replace: true })
          } else {
            navigate('/home', { replace: true })
          }
          e.target.reset()
        })
          .catch(err => console.log(err))
      })
      .catch(err => {
        if (!err.response.data.message) {
          if (!err.response.data) { } else {
            Swal.fire({
              title: err.response.data,
              icon: 'error',
              position: 'center',
              showConfirmButton: false,
              timer: 6000,
              timerProgressBar: true
            })
          }
        } else {
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        }
      })
  }

  const secondChange = (e) => {
    const { name, value } = e.target

    setParams({
      ...params,
      [name]: value
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    axios.post(url + 'user/login', params)
      .then(res => {
        Swal.fire({
          title: res.data.message,
          icon: 'success',
          position: 'center',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
        localStorage.setItem('token', JSON.stringify(res.data.token))
        localStorage.setItem('nombre', JSON.stringify(params.usuario))

        setToken(res.data.token)
        setName(params.usuario)

        if (movieId) {
          navigate('/seats/' + movieId + '/' + numero, { replace: true })
        } else {
          navigate('/home', { replace: true })
        }
        e.target.reset()

      })
      .catch(err => {
        if (!err.response.data.message) {
          if (!err.response.data) { } else {
            Swal.fire({
              title: err.response.data,
              icon: 'error',
              position: 'center',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true
            })
          }
        } else {
          Swal.fire({
            title: err.response.data.message,
            icon: 'error',
            position: 'center',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          })
        }
      })
  }

  return (
    <div style={{ minHeight: '93.6vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }} >
      <div className='body'>
        <div ref={container} id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={handleRegister}>
              <h1>Registrate</h1>
              <input onChange={handleChange} type="text" placeholder="Usuario" name="usuario" required />
              <input onChange={handleChange} type="password" placeholder="Contraseña" name="contraseña" required />
              <div className='d-flex'>
                <input onChange={handleChange} type="text" placeholder="Nombre" name="nombre" required />
                <input onChange={handleChange} type="text" placeholder="Apellido" className='ms-2' name="apellido" required />
              </div>
              <input onChange={handleChange} type="text" placeholder="Identificación" name="identificación" required />
              <input onChange={handleChange} type="email" placeholder="Correo Electrónico" name="correo" required />
              <input onChange={handleChange} type="number" placeholder="Teléfono" name="teléfono" required />
              <button>Registrarse</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form onSubmit={handleLogin} >
              <h1>Inicia Sesión</h1>
              <div className="social-container">
                <a href="#" className="social a"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
              </div>
              <span className='span'>or use your account</span>
              <input onChange={secondChange} type="text" name='usuario' placeholder="Usuario" required />
              <input onChange={secondChange} type="password" name='contraseña' placeholder="Contraseña" required />
              <a href="#" className='social'>Forgot your password?</a>
              <button>Iniciar Sesión</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Welcome Back!</h1>
                <p>To keep connected with us please login with your personal info</p>
                <button ref={signIn} className="ghost" id="signIn">Sign In</button>
              </div>
              <div className="overlay-panel overlay-left">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button ref={signUp} className="ghost" id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
