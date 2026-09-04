import { useState } from "react";
import "./ticketmantenimiento.css";

function TicketMantenimiento({
    usuario,
    agregarTicket,
    cambiarPagina
}) {
    const [descripcion, setDescripcion] = useState("");
    const [lugar, setLugar] = useState("");

    const enviarTicket = (e) => {
        e.preventDefault();

        if (!descripcion.trim() || !lugar.trim()) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        if (descripcion.trim().length < 30) {
            alert("La descripción debe tener al menos 30 caracteres.");
            return;
        }

        const nuevoTicket = {
            id: Date.now(),
            tipo: "mantenimiento",
            descripcion: descripcion.trim(),
            lugar: lugar.trim(),
            estado: "Pendiente"
        };

        agregarTicket(nuevoTicket);

        setDescripcion("");
        setLugar("");

        cambiarPagina("inicio");
    };

    return (
        <div className="mantenimiento-pantalla">

            <header className="mantenimiento-header">

                <span className="mantenimiento-nombre">
                    {usuario || "Nombre"}
                </span>

                <button
                    type="button"
                    className="mantenimiento-perfil"
                    onClick={() => cambiarPagina("perfil")}
                >
                    ♙
                </button>

            </header>


            <button
                type="button"
                className="mantenimiento-volver"
                onClick={() => cambiarPagina("inicio")}
            >
                ←
            </button>


            <main className="mantenimiento-contenido">

                <div className="mantenimiento-caja">

                    <form
                        className="mantenimiento-formulario"
                        onSubmit={enviarTicket}
                    >

                        <h1 className="mantenimiento-titulo">
                            Ticket de mantenimiento
                        </h1>


                        <div className="mantenimiento-campo">

                            <label htmlFor="descripcion">
                                Descripción
                            </label>

                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                placeholder="Describa el problema de mantenimiento"
                                maxLength={500}
                            />

                            <small>
                                {descripcion.length}/500 · Mínimo 30 caracteres
                            </small>

                        </div>


                        <div className="mantenimiento-campo">

                            <label htmlFor="lugar">
                                Lugar
                            </label>

                            <input
                                id="lugar"
                                type="text"
                                value={lugar}
                                onChange={(e) =>
                                    setLugar(e.target.value)
                                }
                                placeholder="Ej: Salón, Laboratorio, etc."
                            />

                        </div>


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
                                onClick={() => cambiarPagina("inicio")}
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