import { useState } from "react";
import "./iniciodesesion.css";

export function InicioSesion({
    setUsuario,
    setEmail,
    setRol,
    cambiarPagina
}) {
    const [cedula, setCedula] = useState("");
    const [password, setPassword] = useState("");

    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cedula || !password) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        setCargando(true);

        try {
            const response = await fetch(
                "http://localhost:3000/usuarios"
            );

            if (!response.ok) {
                throw new Error(
                    "No se pudieron obtener los usuarios."
                );
            }

            const usuarios = await response.json();

            // Buscar al usuario por cédula y contraseña
            const usuarioEncontrado = usuarios.find(
                (usuario) =>
                    String(usuario.cedula).trim() === cedula.trim() &&
                    String(usuario.contraseña) === password
            );

            if (!usuarioEncontrado) {
                alert(
                    "La cédula no está registrada " +
                    "o la contraseña es incorrecta."
                );
                return;
            }

            // Obtener el nombre completo guardado
            const nombreCompleto = usuarioEncontrado.nombre.trim();

            // Mostrar solamente el primer nombre
            const primerNombre = nombreCompleto.split(" ")[0];

            // Guardar los datos para las otras páginas
            setUsuario(primerNombre);
            setEmail(usuarioEncontrado.email);
            setRol(usuarioEncontrado.rol);

            // Ir a la página principal
            cambiarPagina("inicio");

        } catch (error) {
            console.error("Error al iniciar sesión:", error);

            alert(
                "No se pudo iniciar sesión. " +
                "Verificá que la API esté funcionando."
            );

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="login-pantalla">

            <header className="login-header">

                <span>login</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("registro")}
                >
                    Registrarse
                </button>

            </header>


            <main className="login-contenido">

                <div className="login-icono">
                    ♙
                </div>


                <div className="login-caja">

                    <form onSubmit={handleSubmit}>

                        <div className="login-campo">

                            <label htmlFor="cedula">
                                Cédula de identidad
                            </label>

                            <input
                                id="cedula"
                                type="text"
                                inputMode="numeric"
                                value={cedula}
                                onChange={(e) => {
                                    const valor = e.target.value;

                                    if (/^\d*$/.test(valor)) {
                                        setCedula(valor);
                                    }
                                }}
                                placeholder="Cédula de identidad"
                            />

                        </div>


                        <div className="login-campo">

                            <label htmlFor="password">
                                Contraseña
                            </label>

                            <div className="login-password-contenedor">

                                <input
                                    id="password"
                                    type={
                                        mostrarPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Contraseña"
                                />

                                <button
                                    type="button"
                                    className="login-boton-mostrar"
                                    onClick={() =>
                                        setMostrarPassword(
                                            !mostrarPassword
                                        )
                                    }
                                >
                                    {mostrarPassword
                                        ? "Ocultar"
                                        : "Mostrar"}
                                </button>

                            </div>

                        </div>


                        <button
                            type="button"
                            className="recuperar"
                            onClick={() =>
                                alert(
                                    "La recuperación de contraseña todavía no está disponible."
                                )
                            }
                        >
                            Recuperar contraseña
                        </button>


                        <button
                            type="submit"
                            className="login-ingresar"
                            disabled={cargando}
                        >
                            {cargando
                                ? "Verificando..."
                                : "Iniciar Sesión"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default InicioSesion;