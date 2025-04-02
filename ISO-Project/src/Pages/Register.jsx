import { useState } from "react";
import ButtonForm from "../components/ButtonForm";
import { Popup } from "../components/Popup";
import ButtonUG from "../components/ButtonUG";
import { useNavigate } from "react-router-dom";
import "../Styles/Register.css"

const Register = () => {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("Propietario");
    const [error, setError] = useState("");
    const [mostrarPopup, setMostrarPopup] = useState(false);

    const navigate = useNavigate()

    const formatPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    const user = {
        nombre, correo, contrasena, rol
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const simuUsers = JSON.parse(localStorage.getItem('usuarios')) || [];

        if (!nombre || !correo || !contrasena) {
            setError("Por favor, complete todos los campos");
            return;
        }

        if (!formatPassword.test(contrasena)) {
            setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }

        if (simuUsers.some(user => user.correo === correo)){
            setError("El correo ya está registrado")
            return
        }

        simuUsers.push(user)
        
        localStorage.setItem('usuarios', JSON.stringify(simuUsers));

        setNombre("")
        setCorreo("")
        setContrasena("")
        setRol("")
        setError("");
        console.log("Registro exitoso:", { nombre, correo, contrasena, rol });

        const userJSON = JSON.stringify(user);
        console.log(userJSON) //ESTE JSON SE DEBE MANDAR AL BACKEND
        console.log(simuUsers)
        setMostrarPopup(true)
    };
    

    return (
    <div className="pagina-formulario">
        <div className="fondo-imagen">
        <div className="overlay"></div>
        <div className="form-container">
            <h2>Registro de Usuario</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nombre-registro">Nombre:</label>
                <input
                type="text"
                id="nombre-registro"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="correo-registro">Correo Electrónico:</label>
                <input
                type="email"
                id="correo-registro"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="contrasena-registro">Contraseña:</label>
                <input
                type="password"
                id="contrasena-registro"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className={error ? "input-error" : ""}
                />
            </div>
            <div className="form-group">
                <label htmlFor="rol-registro">Rol:</label>
                <select
                className="user-rol"
                id="rol-registro"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                >
                <option value="Propietario">Propietario</option>
                <option value="Interesado">Interesado</option>
                </select>
            </div>
            <ButtonForm type="submit" text={"Registrarse"}></ButtonForm>
            <p className="link">
                ¿Ya tienes una cuenta? <a  onClick={() => {navigate("/Login")}}>Inicia Sesión</a>
            </p>
            </form>
        </div>
        </div>
        {mostrarPopup && <Popup text="Usuario creado exitosamente"
                                button={<ButtonUG ruta={"/Login"} children={"Ok"}></ButtonUG>} />}
    </div>
    );
};

export default Register;
