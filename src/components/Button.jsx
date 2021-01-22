import React from 'react'
import './Button.css'

export default function Button(props){

    let classes = 'button '
    classes += props.operation ? 'operation' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return(
        <button 
            onClick={evento => props.click && props.click(evento.target.innerHTML)}//ou evento.target.innerHTML
            className={classes}
        >
            {props.label}
        </button>
    )
}