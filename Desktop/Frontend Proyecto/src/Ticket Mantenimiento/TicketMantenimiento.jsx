import { useState } from "react";
import './TicketMantenimiento.css';

function TicketMantenimiento({
    agregarTicket,
    cambiarPagina
}) {

    const [descripcion, setDescripcion] = useState("");
    const [lugar, setLugar] = useState("");


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
            estado: "Pendiente"

        };

        // Registrar ticket

        agregarTicket(
            nuevoTicket
        );
        // Limpiar formulario

        setDescripcion("");
        setLugar("");

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

                        placeholder="Ej: Salón, Laboratorio, etc"

                    />

                </div>


                <br />
                
                <button type="submit">
                    Subir
                </button>

                <button
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