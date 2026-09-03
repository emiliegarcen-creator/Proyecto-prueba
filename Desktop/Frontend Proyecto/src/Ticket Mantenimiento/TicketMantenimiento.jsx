import { useState } from "react";
import "./ticketmantenimiento.css";

function TicketMantenimiento({
    agregarTicket,
    cambiarPagina
}) {
    const [descripcion, setDescripcion] = useState("");
    const [lugar, setLugar] = useState("");

    const enviarTicket = (e) => {
        e.preventDefault();

        // Validaciones
        if (!descripcion || !lugar) {
            alert("Todos los campos son obligatorios.");
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
        agregarTicket(nuevoTicket);

        // Limpiar formulario
        setDescripcion("");
        setLugar("");

        // Volver a página principal
        cambiarPagina("inicio");
    };

    return (
        <div className="mantenimiento-pantalla">

            {/* Barra superior */}

            <header className="mantenimiento-header">

                <span>Nombre</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("perfil")}
                >
                    ♙
                </button>

            </header>

            {/* Botón volver */}

            <button
                type="button"
                className="mantenimiento-volver"
                onClick={() => cambiarPagina("inicio")}
            >
                ←
            </button>

            {/* Formulario */}

            <main className="mantenimiento-contenido">

                <div className="mantenimiento-caja">

                    <form onSubmit={enviarTicket}>

                        {/* Descripción */}

                        <div className="mantenimiento-campo">

                            <label>
                                Descripción
                            </label>

                            <textarea
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                placeholder="¿En qué lugar está pasando?"
                            />

                            <small>
                                Min:30
                            </small>

                        </div>

                        {/* Lugar */}

                        <div className="mantenimiento-campo">

                            <label>
                                Lugar
                            </label>

                            <input
                                type="text"
                                value={lugar}
                                onChange={(e) =>
                                    setLugar(e.target.value)
                                }
                                placeholder="Ej: Salón, Laboratorio, etc."
                            />

                        </div>

                        {/* Botones */}

                        <div className="mantenimiento-botones">

                            <button
                                type="submit"
                                className="mantenimiento-subir"
                            >
                                Subir
                            </button>

                            <button
                                type="button"
                                className="mantenimiento-cancelar"
                                onClick={() =>
                                    cambiarPagina("inicio")
                                }
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default TicketMantenimiento;