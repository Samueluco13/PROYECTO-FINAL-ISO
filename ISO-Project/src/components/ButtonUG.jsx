import React from 'react'
import "./ButtonUG.css"
import { useNavigate } from 'react-router-dom'

const ButtonUG = ({children, ruta}) => {

const navigate = useNavigate()

    return (
    <button className="button-nav" onClick={() => navigate(ruta)} >{children}</button>
    )
}
export default ButtonUG;