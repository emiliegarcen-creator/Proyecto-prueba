import './iniciodesesion.css';
import { useState } from "react";




function InicioSesion({
    iniciarSesion,
    cambiarPagina
}) {


    const [nombreUsuario, setNombreUsuario] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(

            "BOTÓN INICIAR SESIÓN PRESIONADO"

        );




        // Validar campos


        if (

            nombreUsuario === "" ||

            password === ""

        ) {


            alert(

                "Todos los campos son obligatorios."

            );


            return;


        }




        // Iniciar sesión


        iniciarSesion(

            nombreUsuario,

            password

        );


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

                        setNombreUsuario(

                            e.target.value

                        )
                    }

                />

                <br />


                <br />

                <input


                    type="password"


                    placeholder="Password"


                    value={password}


                    onChange={(e) =>


                        setPassword(


                            e.target.value


                        )


                    }


                />

                <br />


                <br />


                <button class="botones" type="submit">

                    Iniciar sesión

                </button>


            </form>




            <br />




            <button class="boton-crear-cuenta"
                type="button"

                onClick={() => {


                    console.log(


                        "BOTÓN CREAR CUENTA"


                    );


                    cambiarPagina("registro");


                }}


            >


                Crear una cuenta


            </button>


        </section>


    );


}


export default InicioSesion;