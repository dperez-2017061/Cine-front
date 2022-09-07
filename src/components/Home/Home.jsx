import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { url } from '../../GlobalUrl'
import { Película } from '../Película/Película'

export const Home = ({ token }) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios.get(url + 'movie/getMovies')
      .then(res => {
        setMovies(res.data)
      })
      .catch(err => {
        if (!err.response.data.message) return
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
    <div style={{ minHeight: '93.6vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', margin: '0 1rem' }} >
      {
        movies.map((movie, index) =>
          <Película key={index} movie={movie} token={token} />
        )
      }
    </div>
  )
}
