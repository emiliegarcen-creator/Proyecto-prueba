import { useState } from "react";
import "./Registro.css";

function Registro({ cambiarPagina }) {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [cedula, setCedula] = useState("");
    const [rol, setRol] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [confirmarContraseña, setConfirmarContraseña] = useState("");

    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [cargando, setCargando] = useState(false);

    const enviarFormulario = async (e) => {
        e.preventDefault();

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

        if (!/^\d+$/.test(cedula)) {
            alert("La cédula debe contener solamente números.");
            return;
        }

        setCargando(true);

        try {
            // Obtener los usuarios ya registrados
            const usuariosResponse = await fetch(
                "http://localhost:3000/usuarios"
            );

            if (!usuariosResponse.ok) {
                throw new Error("No se pudieron obtener los usuarios.");
            }

            const usuarios = await usuariosResponse.json();

            // Comprobar si la cédula ya existe
            const cedulaExiste = usuarios.some(
                (usuario) =>
                    String(usuario.cedula).trim() === cedula.trim()
            );

            if (cedulaExiste) {
                alert("Esa cédula ya está registrada.");
                return;
            }

            // Guardar el nuevo usuario
            const response = await fetch(
                "http://localhost:3000/usuarios",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombre: nombre.trim(),
                        email: email.trim(),
                        cedula: cedula.trim(),
                        rol,
                        contraseña,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo guardar el usuario.");
            }

            const usuarioCreado = await response.json();

            console.log("Usuario registrado:", usuarioCreado);

            alert(
                "Usuario registrado correctamente. " +
                "Ahora podés iniciar sesión con tu cédula."
            );

            // Limpiar los campos
            setNombre("");
            setEmail("");
            setCedula("");
            setRol("");
            setContraseña("");
            setConfirmarContraseña("");

            // Volver al Login
            cambiarPagina("login");

        } catch (error) {
            console.error("Error al registrar:", error);

            alert(
                "No se pudo registrar al usuario. " +
                "Verificá que la API esté funcionando."
            );

        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="registro-pantalla">

            <header className="registro-header">

                <span>registro</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("login")}
                >
                    Iniciar Sesión
                </button>

            </header>


            <main className="registro-contenido">

                <div className="registro-caja">

                    <form onSubmit={enviarFormulario}>

                        <div className="registro-campo campo-completo">

                            <label htmlFor="nombre">
                                Nombre completo
                            </label>

                            <input
                                id="nombre"
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                                placeholder="Nombre completo"
                            />

                        </div>


                        <div className="registro-campo">

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
                                placeholder="Ej: 12345678"
                            />

                            <small>
                                Tu cédula será tu nombre de usuario.
                            </small>

                        </div>


                        <div className="registro-campo">

                            <label htmlFor="rol">
                                Rol
                            </label>

                            <select
                                id="rol"
                                value={rol}
                                onChange={(e) =>
                                    setRol(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccione
                                </option>

                                <option value="Cliente">
                                    Cliente
                                </option>

                            </select>

                        </div>


                        <div className="registro-campo campo-completo">

                            <label htmlFor="email">
                                Mail
                            </label>

                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="ejemplo@gmail.com"
                            />

                        </div>


                        <div className="registro-campo campo-completo">

                            <label htmlFor="contraseña">
                                Contraseña
                            </label>

                            <div className="contraseña-contenedor">

                                <input
                                    id="contraseña"
                                    type={
                                        mostrarContraseña
                                            ? "text"
                                            : "password"
                                    }
                                    value={contraseña}
                                    onChange={(e) =>
                                        setContraseña(e.target.value)
                                    }
                                    placeholder="Contraseña"
                                />

                                <button
                                    type="button"
                                    className="boton-mostrar"
                                    onClick={() =>
                                        setMostrarContraseña(
                                            !mostrarContraseña
                                        )
                                    }
                                >
                                    {mostrarContraseña
                                        ? "Ocultar"
                                        : "Mostrar"}
                                </button>

                            </div>

                        </div>


                        <div className="registro-campo campo-completo">

                            <label htmlFor="confirmarContraseña">
                                Repetir contraseña
                            </label>

                            <div className="contraseña-contenedor">

                                <input
                                    id="confirmarContraseña"
                                    type={
                                        mostrarConfirmacion
                                            ? "text"
                                            : "password"
                                    }
                                    value={confirmarContraseña}
                                    onChange={(e) =>
                                        setConfirmarContraseña(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Repetir contraseña"
                                />

                                <button
                                    type="button"
                                    className="boton-mostrar"
                                    onClick={() =>
                                        setMostrarConfirmacion(
                                            !mostrarConfirmacion
                                        )
                                    }
                                >
                                    {mostrarConfirmacion
                                        ? "Ocultar"
                                        : "Mostrar"}
                                </button>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="boton-registrarse"
                            disabled={cargando}
                        >
                            {cargando
                                ? "Registrando..."
                                : "Registrarse"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default Registro;