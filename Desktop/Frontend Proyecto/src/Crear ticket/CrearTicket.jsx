import "./CrearTicket.css";
import { useState } from "react";

function CrearTicket({
    agregarTicket,
    cambiarPagina
}) {


    const [descripcion, setDescripcion] =
        useState("");
    const [idComputadora, setIdComputadora] =
        useState("");
    const [cargador, setCargador] =
        useState("");
    const [modelo, setModelo] =
        useState("");
    const [locker, setLocker] =
        useState("");
    const [año, setAño] =
        useState("");
    const [imagen, setImagen] =
        useState(null);

    const enviarTicket = (e) => {
        e.preventDefault();

        // Campos obligatorios


        if (
            !descripcion ||
            !idComputadora ||
            !cargador ||
            !modelo ||
            !locker ||
            !año
        ) {


            alert(
                "Todos los campos son obligatorios."
            );
            return;

        }

        // Mínimo 30 caracteres


        if (descripcion.length < 30) {


            alert(


                "Caracteres minimos no alcanzados"


            );


            return;


        }




        // El ID de la computadora debe tener exactamente 3 dígitos


        if (


            !/^\d{3}$/.test(idComputadora)


        ) {


            alert(


                "El ID de la computadora debe tener exactamente 3 dígitos."


            );


            return;


        }




        // Crear ticket


        const nuevoTicket = {
            id: Date.now(),
            tipo: "reparacion",
            descripcion: descripcion,
            idComputadora: idComputadora,
            cargador: cargador,
            modelo: modelo,
            locker: locker,
            año: año,
            imagen: imagen,
            estado: "Pendiente"
        };

        // Guardar ticket
        agregarTicket(
            nuevoTicket
        );

        // Limpiar formulario


        setDescripcion("");
        setIdComputadora("");
        setCargador("");
        setModelo("");
        setLocker("");
        setAño("");
        setImagen(null);




        // Volver a inicio


        cambiarPagina(


            "inicio"


        );


    };




    // Adjuntar imagen


    const manejarCambio = (e) => {


        const archivo = e.target.files[0];




        if (archivo) {




            // Validar formato de imagen


            if (


                !archivo.type.startsWith("image/")


            ) {


                alert(


                    "El formato no es el adecuado y el sistema pide que ingrese un formato válido."


                );


                return;


            }




            setImagen(


                URL.createObjectURL(archivo)


            );


        }


    };




    return (


        <div className="crear-ticket">


            <h1>


                Ticket de reparación


            </h1>




            <form


                onSubmit={enviarTicket}


            >




                {/* Adjuntar archivo */}


                <div>


                    <label>


                        Adjuntar imagen


                    </label>


                    <br />


                    <input


                        type="file"


                        accept="image/*"


                        onChange={manejarCambio}


                    />




                    {/* Vista previa de la imagen */}


                    {imagen && (


                        <img


                            src={imagen}


                            alt="Vista previa"


                        />


                    )}


                </div>




                <br />




                <div>


                    <label>


                        Descripción


                    </label>


                    <br />




                    <textarea


                        value={descripcion}


                        onChange={(e) =>


                            setDescripcion(


                                e.target.value


                            )


                        }


                        placeholder="Describa qué está fallando con la computadora"


                    />




                    <p>


                        Caracteres:{" "}


                        {descripcion.length}


                        /30


                    </p>


                </div>




                <br />




                <div>


                    <label>


                        ID de la computadora


                    </label>


                    <br />




                    <input


                        type="text"


                        maxLength="3"


                        value={idComputadora}


                        onChange={(e) =>


                            setIdComputadora(


                                e.target.value


                            )


                        }


                        placeholder="Ej: 123"


                    />


                </div>




                <br />




                <div>


                    <label>


                        ¿Tiene cargador?


                    </label>


                    <br />




                    <select


                        value={cargador}


                        onChange={(e) =>


                            setCargador(


                                e.target.value


                            )


                        }


                    >


                        <option value="">


                            Seleccionar


                        </option>




                        <option value="Sí">


                            Sí


                        </option>




                        <option value="No">


                            No


                        </option>


                    </select>


                </div>




                <br />




                <div>


                    <label>


                        ¿Qué modelo es la computadora?


                    </label>


                    <br />




                    <input


                        type="text"


                        value={modelo}


                        onChange={(e) =>


                            setModelo(


                                e.target.value


                            )


                        }


                    />


                </div>




                <br />




                <div>


                    <label>


                        Número de locker


                    </label>


                    <br />




                    <input


                        type="text"


                        value={locker}


                        onChange={(e) =>


                            setLocker(


                                e.target.value


                            )


                        }


                    />


                </div>




                <br />




                {/* Año que está cursando */}


                <div>


                    <label>


                        Año que está cursando


                    </label>


                    <br />




                    <select


                        value={año}


                        onChange={(e) =>


                            setAño(


                                e.target.value


                            )


                        }


                    >


                        <option value="">


                            Seleccionar


                        </option>




                        <option value="1ero">


                            1ero


                        </option>




                        <option value="2do">


                            2do


                        </option>




                        <option value="3ero">


                            3ero


                        </option>


                    </select>


                </div>




                <br />




                <button id="boton-subir" type="submit">


                    Subir


                </button>




                <button id="boton-cancelar"
                    type="button"


                    onClick={() =>


                        cambiarPagina(


                            "inicio"


                        )


                    }


                >


                    Cancelar


                </button>


            </form>


        </div>


    );


}


export default CrearTicket;