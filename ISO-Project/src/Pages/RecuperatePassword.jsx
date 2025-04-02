import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonForm from "../components/ButtonForm";
import { Popup } from "../components/Popup";
import ButtonUG from "../components/ButtonUG";


export default function RecuperatePassword() {
    const [mostrarRecuperar, setMostrarRecuperar] = useState(true);
    const [error, setError] = useState("");
    const [nombre, setNombre] = useState("")
    const [nuevaContrasena, setNuevaContrasena] = useState("")
    const [confirmarNuevaContrasena, setConfirmarNuevaContrasena] = useState("")
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const navigate = useNavigate()

    const formatPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const simuUsers = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = simuUsers.find(usuario => usuario.nombre === nombre);

    const handleRecuperarSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para solicitar la recuperación

        if (!usuario){
            setError("Usuario no encontrado")
            setNombre("")
            return
        }
        setError("")
        setMostrarRecuperar(false);
    };

    const handleNuevaContrasenaSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para cambiar la contraseña
        if (!formatPassword.test(nuevaContrasena)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            console.log(nuevaContrasena)
            return;
        }

        if(nuevaContrasena != confirmarNuevaContrasena){
            setError("La contraseña debe coincidir.")
            return
        }

        const updatedUsers = simuUsers.map(user => 
            user.nombre === nombre ? { ...user, contrasena: nuevaContrasena } : user
        );

        localStorage.setItem('usuarios', JSON.stringify(updatedUsers));


        setMostrarPopup(true)
        setNuevaContrasena("")
        setConfirmarNuevaContrasena("")
        setError("")
    };

    return (
    <div className="pagina-formulario">
        <div className="fondo-imagen">
        <div className="overlay"></div>
        <div className="form-container">
            <h2>Recuperar Contraseña</h2>
            {error && <p className="error">{error}</p>}
            {mostrarRecuperar ? (
            <form id="form-recuperar" onSubmit={handleRecuperarSubmit}>
                < div className="form-group">
                <label htmlFor="nombre-recuperar">Nombre de Usuario:</label>
                <input type="text"
                id="nombre-recuperar"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required />
                </div>
                <ButtonForm text={"Solicitar Recuperación"}></ButtonForm>
                <p className="link">
                <a onClick={() => {navigate("/Login")}}>Volver al Inicio de Sesión</a>
                </p>
            </form>
            ) : (
            <form id="form-nueva-contrasena" onSubmit={handleNuevaContrasenaSubmit}>
                <div className="form-group">
                <label htmlFor="nueva-contrasena">Nueva Contraseña:</label>
                <input type="password"
                id="nueva-contrasena"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                required />
                </div>
                <div className="form-group">
                <label htmlFor="confirmar-contrasena">Confirmar Contraseña:</label>
                <input type="password"
                id="confirmar-contrasena"
                required
                value={confirmarNuevaContrasena}
                onChange={(e) => setConfirmarNuevaContrasena(e.target.value)}
                />
                </div>
                <ButtonForm text={"Cambiar Contraseña"}></ButtonForm>
            </form>
            )}
        </div>
        </div>
        {mostrarPopup && <Popup text="Contraseña cambiada exitosamente"
                                button={<ButtonUG ruta={"/Login"} children={"Ok"}></ButtonUG>} />}
    </div>
    );
}
