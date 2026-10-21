import  { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarioSoporte.css";

function CalendarioSoporte({ tickets, actualizarTicket }) {
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);
    const [modoAplazar, setModoAplazar] = useState(false);
    const [nuevaFecha, setNuevaFecha] = useState("");

    // Evento del calendario (Ticket)
    const handleEventClick = (clickInfo) => {
        const ticketEncontrado = tickets.find(
            (t) => t.id.toString() === clickInfo.event.id
        );
        if (ticketEncontrado) {
            setTicketSeleccionado(ticketEncontrado);
            setModoAplazar(false);
        }
    };

    // Aplazar ticket
    const handleAplazar = (tipo) => {
        let fechaActualizada = new Date(ticketSeleccionado.fecha || Date.now());

        if (tipo === "1hora") {
            fechaActualizada.setHours(fechaActualizada.getHours() + 1);
        } else if (tipo === "1dia") {
            fechaActualizada.setDate(fechaActualizada.getDate() + 1);
        } else if (tipo === "manual" && nuevaFecha) {
            fechaActualizada = new Date(nuevaFecha);
        }

        const ticketActualizado = {
            ...ticketSeleccionado,
            fecha: fechaActualizada.toISOString().split("T")[0]
        };

        actualizarTicket(ticketActualizado);
        alert("Ticket aplazado con éxito. Notificación enviada al cliente.");
        setTicketSeleccionado(null);
        setModoAplazar(false);
    };

   
    const eventosCalendario = tickets
        .filter((t) => t.fecha)
        .map((t) => ({
            id: t.id.toString(),
            title: `M:${t.idComputadora} - ${t.dueño || "Alumno"}`,
            start: t.fecha,
            allDay: true
        }));

    return (
        <div className="calendario-soporte-container">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={eventosCalendario}
                eventClick={handleEventClick}
                locale="es"
            />

            {/*Aplazamiento */}
            {ticketSeleccionado && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>ID del ticket: {ticketSeleccionado.idComputadora}</h2>
                        <div className="grid-detalle">
                            <p><strong>Dueño:</strong> {ticketSeleccionado.dueño}</p>
                            <p><strong>Número de locker:</strong> {ticketSeleccionado.locker}</p>
                            <p><strong>Orientación:</strong> {ticketSeleccionado.orientacion || "General"}</p>
                            <p><strong>Año:</strong> {ticketSeleccionado.año}</p>
                        </div>

                        {!modoAplazar ? (
                            <div className="acciones-modal">
                                <button className="btn-accion" onClick={() => setModoAplazar(true)}>
                                    Aplazar
                                </button>
                                <button className="btn-cerrar-modal" onClick={() => setTicketSeleccionado(null)}>
                                    Guardar / Cerrar
                                </button>
                            </div>
                        ) : (
                            <div className="opciones-aplazar">
                                <h3>Seleccione opción de aplazamiento</h3>
                                <button className="btn-accion" onClick={() => handleAplazar("1hora")}>1 hora</button>
                                <button className="btn-accion" onClick={() => handleAplazar("1dia")}>1 día</button>
                                <div className="grupo-manual">
                                    <input
                                        type="date"
                                        value={nuevaFecha}
                                        onChange={(e) => setNuevaFecha(e.target.value)}
                                    />
                                    <button className="btn-accion" onClick={() => handleAplazar("manual")}>Subir</button>
                                </div>
                                <button className="btn-cerrar-modal" onClick={() => setModoAplazar(false)}>Volver</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarioSoporte;