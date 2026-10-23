import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function Registro({ cambiarPagina }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [cedula, setCedula] = useState("");
    const [rol, setRol] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    async function enviarFormulario(e) {
        e.preventDefault();

        if (!nombre || !email || !cedula || !rol || !contraseña || !confirmarContraseña) {
            alert("Tiene que rellenar todos los campos");
            return;
        }

        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
            alert("El nombre solo puede contener texto");
            return;
        }

        if (!/^\d{1,8}$/.test(cedula)) {
            alert("La cédula debe contener solo números y un máximo de 8 caracteres");
            return;
        }

        if (!email.endsWith("@gmail.com")) {
            alert("Proporcione un Gmail válido");
            return;
        }

        const contraseñaValida = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(contraseña);
        if (!contraseñaValida) {
            alert("La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un carácter especial");
            return;
        }

        if (contraseña !== confirmarContraseña) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/auth/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cedula, nombre, email, rol, contraseña })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al registrar el usuario");
            }

            alert("Usuario registrado correctamente.");
            setNombre("");
            setEmail("");
            setCedula("");
            setRol("");
            setContraseña("");
            setConfirmarContraseña("");
            cambiarPagina("login");
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div>
            <h2>Registro de Usuario</h2>
            <form onSubmit={enviarFormulario}>
                <div>
                    <label>Nombre</label><br />
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                </div><br />
                <div>
                    <label>Cédula</label><br />
                    <input type="text" maxLength="8" value={cedula} onChange={(e) => setCedula(e.target.value)} />
                </div><br />
                <div>
                    <label>Gmail</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div><br />
                <div>
                    <label>Rol</label><br />
                    <select value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="">Seleccionar</option>
                        <option value="TIC">TIC</option>
                        <option value="ADM">ADM</option>
                    </select>
                </div><br />
                <div>
                    <label>Contraseña</label><br />
                    <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                </div><br />
                <div>
                    <label>Confirmar Contraseña</label><br />
                    <input type="password" value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} />
                </div><br />
                <button type="submit">Registrarse</button>
            </form><br />
            <button className="botones" id="boton-cancelar" type="button" onClick={() => cambiarPagina("login")}>
                Volver al inicio de sesión
            </button>
        </div>
    );
}

export default Registro;