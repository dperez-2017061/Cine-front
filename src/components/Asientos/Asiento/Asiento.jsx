import React, { useEffect, useState } from 'react'

export const Asiento = ({
    index,
    i,
    object,
    indexes,
    setIndexes
}) => {
    const [image, setImage] = useState()

    useEffect(() => {
        object.estado == 'libre' ?
            setImage(require('../../../shared/img/asiento.png')) : object.estado == 'vacío' ?
                setImage(require('../../../shared/img/asientoVacio.png')) :
                setImage(require('../../../shared/img/asientoOcupado.png'))
    }, [])

    useEffect(() => {
        if(indexes.length !== 0) return
        object.estado == 'libre' ?
            setImage(require('../../../shared/img/asiento.png')) : object.estado == 'vacío' ?
                setImage(require('../../../shared/img/asientoVacio.png')) :
                setImage(require('../../../shared/img/asientoOcupado.png'))
    }, [indexes])

    const handleClick = (e) => {
        if (object.estado === 'vacío' || object.estado === 'ocupado') return

        if (image === require('../../../shared/img/asiento.png')) {
            setImage(require('../../../shared/img/asientoElegido.png'))
            setIndexes([
                ...indexes,
                [index, i, object.numero]
            ])
        } else {
            setImage(require('../../../shared/img/asiento.png'))
            const indexF = indexes.filter(value => (
                value[0] !== index || value[1] !== i
            ))
            setIndexes(indexF)
        }
    }

    return (
        <img
            onClick={handleClick}
            className='m-2'
            src={image}
            alt="Asiento"
        />
    )
}
