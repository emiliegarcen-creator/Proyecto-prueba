import { useState } from "react";
import './iniciodesesion.css';

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

        console.log("BOTÓN INICIAR SESIÓN PRESIONADO");


        // Validar campos
        if (
            nombreUsuario === "" ||
            password === ""
        ) {

            alert("Todos los campos son obligatorios.");

            return;
        }


        // Guardar usuario
        setUsuario(nombreUsuario);

        setEmail(nombreUsuario + "@gmail.com");

        setRol("Cliente");


        console.log("LOGIN CORRECTO");

        console.log("AHORA VOY A INICIO");


        // Ir a la página principal
        cambiarPagina("inicio");

    };


    return (

        <section>

            <h1>
                Login
            </h1>


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={nombreUsuario}
                    onChange={(e) =>
                        setNombreUsuario(e.target.value)
                    }
                />


                <br />
                <br />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />


                <br />
                <br />


                <button type="submit">
                    Iniciar sesión
                </button>

            </form>


            <br />


            <button
                type="button"
                onClick={() => {
                    console.log("BOTÓN CREAR CUENTA");

                    cambiarPagina("registro");
                }}
            >
                Crear una cuenta
            </button>

        </section>

    );
}
export default InicioSesion;