import { useState } from "react";
import './TicketMantenimiento.css';


function TicketMantenimiento({
agregarTicket,

cambiarPagina


}) {


const [descripcion, setDescripcion] = useState("");
const [lugar, setLugar] = useState("");
const [imagen, setImagen] = useState(null);


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


const enviarTicket = (e) => {


    e.preventDefault();
    // Validaciones

    if (

        !descripcion ||

        !lugar

    ) {


        alert(
            "Todos los campos son obligatorios."
        );




        // Permanece en el formulario
        return;
    }

    const nuevoTicket = {


        id: Date.now(),


        tipo: "mantenimiento",

        descripcion: descripcion,

        lugar: lugar,

        imagen: imagen,

        estado: "Pendiente"
    };




    // Registrar ticket

    agregarTicket(
        nuevoTicket
    );




    // Limpiar formulario


    setDescripcion("");
    setLugar("");
    setImagen(null);




    // Volver a página principal


    cambiarPagina(

        "inicio"

    );


};




return (

    <div className="ticket-mantenimiento">

        <h1>
            Ticket de mantenimiento
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
                    Descripción del problema
                </label>


                <br />


                <textarea
                    value={descripcion}

                    onChange={(e) =>

                        setDescripcion(
                            e.target.value
                        )
                    }

                    placeholder="Describa el problema de mantenimiento"

                />

            </div>




            <br />


            <div>
                <label>

                    ¿En qué lugar del instituto está pasando?

                </label>


                <br />

                <input

                    type="text"

                    value={lugar}

                    onChange={(e) =>

                        setLugar(


                            e.target.value

                        )
                    }

                    placeholder="Ej: Salón, Laboratorio, etc."

                />

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


export default TicketMantenimiento;