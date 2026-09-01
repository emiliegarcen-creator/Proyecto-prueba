import { useState } from "react";
import './Registro.css';

function Registro({ cambiarPagina }) {

    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [cedula, setCedula] = useState("");
    const [rol, setRol] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    async function enviarFormulario(e) {

        e.preventDefault();

        // Validaciones
        if (
            !nombre ||
            !email ||
            !cedula ||
            !rol ||
            !contraseña ||
            !confirmarContraseña
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const response = await fetch(
            "http://localhost:3000/usuarios",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nombre,
                    email,
                    cedula,
                    rol,
                    contraseña,
                    confirmarContraseña,
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Error al guardar el usuario.");
        }

        const data = await response.json();

        alert("Usuario registrado correctamente.");

        console.log(data);

        // Limpiar formulario
        setNombre("");
        setEmail("");
        setCedula("");
        setRol("");
        setContraseña("");
        setConfirmarContraseña("");
    }

    return (
        <div>

            <h2>Registro de Usuario</h2>

            <form onSubmit={enviarFormulario}>

                <div>
                    <label>Nombre</label>
                    <br />

                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Cédula</label>
                    <br />

                    <input
                        type="number"
                        value={cedula}
                        onChange={(e) => setCedula(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Gmail</label>
                    <br />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Rol</label>
                    <br />

                    <input
                        type="text"
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Contraseña</label>
                    <br />

                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Confirmar Contraseña</label>
                    <br />

                    <input
                        type="password"
                        value={confirmarContraseña}
                        onChange={(e) =>
                            setConfirmarContraseña(e.target.value)
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Guardar
                </button>

            </form>

            <br />

            <button
                type="button"
                onClick={() => cambiarPagina("login")}
            >
                Volver al inicio de sesión
            </button>

        </div>
    );
}

export default Registro;