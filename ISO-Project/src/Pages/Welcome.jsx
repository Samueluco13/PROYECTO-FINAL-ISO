import React from "react";
import "../Styles/Welcome.css"
import {useNavigate} from "react-router-dom"
import ButtonUG from "../components/ButtonUG";

const Welcome = () => {

return (
    <div className="pagina-bienvenida">
    <div className="fondo-imagen">
        <div className="overlay"></div>
        <div className="contenido-bienvenida">
        <h2>¡Bienvenido al Sistema de Publicación de Avisos!</h2>
        <p>Encuentra o publica espacios de arrendamiento de manera fácil y segura.</p>
        <div className="acciones-bienvenida">
            <ButtonUG ruta={"/Login"} children={"Iniciar Sesión"}></ButtonUG>
            <ButtonUG ruta={"/Register"} children={"Registrarse"}></ButtonUG>
        </div>
        </div>
    </div>
    </div>
    );
};

export default Welcome;
