import { useState } from "react";
import "./iniciodesesion.css";

export function InicioSesion({
    setUsuario,
    setEmail,
    setRol,
    cambiarPagina
}) {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            nombreUsuario === "" ||
            password === ""
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        setUsuario(nombreUsuario);
        setEmail(nombreUsuario + "@gmail.com");
        setRol("Cliente");

        cambiarPagina("inicio");
    };

    return (
        <div className="login-pantalla">

            {/* Barra superior */}

            <header className="login-header">

                <span>login</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("registro")}
                >
                    Registrarse
                </button>

            </header>


            {/* Contenido */}

            <main className="login-contenido">

                {/* Icono de usuario */}

                <div className="login-icono">
                    ♙
                </div>


                {/* Caja lila */}

                <div className="login-caja">

                    {/* Formulario blanco */}

                    <form onSubmit={handleSubmit}>

                        <div className="login-campo">

                            <label>
                                Nombre de Usuario
                            </label>

                            <input
                                type="text"
                                placeholder="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={(e) =>
                                    setNombreUsuario(e.target.value)
                                }
                            />

                        </div>


                        <div className="login-campo">

                            <label>
                                Contraseña
                            </label>

                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                            />

                        </div>


                        <button
                            type="button"
                            className="recuperar"
                        >
                            Recuperar contraseña
                        </button>


                        <button
                            type="submit"
                            className="login-ingresar"
                        >
                            Iniciar Sesión
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default InicioSesion;