import { useState } from "react";
import ButtonForm from "../components/ButtonForm";
import {useNavigate} from "react-router-dom"


const Login = () => {
    const [nombre, setNombre] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [recordarme, setRecordarme] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const simuUsers = JSON.parse(localStorage.getItem('usuarios')) || [];

    const user = simuUsers.find(user => user.nombre === nombre);

    const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de validación y autenticación aquí
    if (!nombre || !contrasena) {
        setError("Por favor, complete todos los campos");
        return;
    }

    if (!user){
        setError("Usuario no encontradao")
        return
    }

    if (user.contrasena !== contrasena) {
        setError("Contraseña incorrecta");
        return;
    }

    console.log(user.contrasena)



    setError("");
    console.log("Usuario:", nombre, "Contrsaeña: ", contrasena, "Recordarme:", recordarme);
    };

return (
    <div className="pagina-formulario">
        <div className="fondo-imagen">
        <div className="overlay"></div>
        <div className="form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="nombre-login">Nombre de Usuario</label>
                <input
                type="text"
                id="nombre-login"
                name="nombre-login"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="contrasena-login">Contraseña</label>
                <input
                type="password"
                id="contrasena-login"
                name="contrasena-login"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                />
            </div>
            <div className="form-group checkbox">
                <input
                className="login-checkbox"
                type="checkbox"
                id="recordarme"
                name="recordarme"
                checked={recordarme}
                onChange={(e) => setRecordarme(e.target.checked)}
                /><span></span>
                <label htmlFor="recordarme">Recordarme</label>
            </div>
            {error && <div className="error">{error}</div>}
            <ButtonForm text={"Iniciar Sesión"}></ButtonForm>
            </form>
            <div className="link">
            <a onClick={() => {navigate("/RecuperatePassword")}}>¿Olvidaste tu contraseña?</a>
            </div>
            <div className="link">
            <a  onClick={() => {navigate("/Register")}}>¿No tienes cuenta? Regístrate</a>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Login;
