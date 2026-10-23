import { useState } from "react";
import './iniciodesesion.css';

function InicioSesion({ iniciarSesion, cambiarPagina }) {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (nombreUsuario === "" || password === "") {
            alert("Todos los campos son obligatorios.");
            return;
        }

        iniciarSesion(nombreUsuario, password);
    };

    return (
        <section>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                />
                <br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br /><br />
                <button type="submit">Iniciar sesión</button>
            </form>

            <br />

            <button
                className="boton-crear-cuenta"
                type="button"
                onClick={() => cambiarPagina("registro")}
            >
                Crear una cuenta
            </button>
        </section>
    );
}

export default InicioSesion;