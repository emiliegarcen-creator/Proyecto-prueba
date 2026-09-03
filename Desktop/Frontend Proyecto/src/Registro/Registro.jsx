import { useState } from "react";
import "./Registro.css";

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

        try {
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

            cambiarPagina("login");

        } catch (error) {
            console.error(error);
            alert("No se pudo registrar el usuario.");
        }
    }

    return (
        <div className="registro-pantalla">

            {/* Barra superior */}

            <header className="registro-header">

                <span>registro</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("login")}
                >
                    Iniciar Sesión
                </button>

            </header>


            {/* Contenido */}

            <main className="registro-contenido">

                <div className="registro-caja">

                    <form onSubmit={enviarFormulario}>

                        {/* Nombre */}

                        <div className="registro-campo campo-completo">

                            <label>
                                Nombre Completo
                            </label>

                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                            />

                        </div>


                        {/* Cédula */}

                        <div className="registro-campo">

                            <label>
                                Cédula de Identidad
                            </label>

                            <input
                                type="number"
                                value={cedula}
                                onChange={(e) =>
                                    setCedula(e.target.value)
                                }
                            />

                        </div>


                        {/* Rol */}

                        <div className="registro-campo">

                            <label>
                                Rol
                            </label>

                            <input
                                type="text"
                                value={rol}
                                onChange={(e) =>
                                    setRol(e.target.value)
                                }
                            />

                        </div>


                        {/* Mail */}

                        <div className="registro-campo campo-completo">

                            <label>
                                Mail
                            </label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                            />

                        </div>


                        {/* Contraseña */}

                        <div className="registro-campo campo-completo">

                            <label>
                                Contraseña
                            </label>

                            <input
                                type="password"
                                value={contraseña}
                                onChange={(e) =>
                                    setContraseña(e.target.value)
                                }
                            />

                        </div>


                        {/* Confirmar contraseña */}

                        <div className="registro-campo campo-completo">

                            <label>
                                Repetir Contraseña
                            </label>

                            <input
                                type="password"
                                value={confirmarContraseña}
                                onChange={(e) =>
                                    setConfirmarContraseña(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        {/* Botón */}

                        <button
                            type="submit"
                            className="boton-registrarse"
                        >
                            Registrarse
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default Registro;