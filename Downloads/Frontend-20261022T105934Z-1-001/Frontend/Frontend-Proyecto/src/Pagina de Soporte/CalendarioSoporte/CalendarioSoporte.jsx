import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarioSoporte.css";

const API_URL = "http://localhost:3001";

function CalendarioSoporte() {
    const [tickets, setTickets] = useState([]);
    const [ticketSeleccionado, setTicketSeleccionado] = useState(null);

    useEffect(() => {
        const cargarTickets = async () => {
            try {
                const res = await fetch(`${API_URL}/ticket`);
                if (res.ok) {
                    const data = await res.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error("Error al cargar los tickets:", error);
            }
        };

        cargarTickets();
    }, []);

    const handleEventClick = (clickInfo) => {
        const ticketEncontrado = tickets.find(
            (t) => t.ID_ticket.toString() === clickInfo.event.id
        );
        if (ticketEncontrado) {
            setTicketSeleccionado(ticketEncontrado);
        }
    };

    const eventosCalendario = tickets.map((t) => ({
        id: t.ID_ticket.toString(),
        title: `Máquina: ${t.ID_maquina}`,
        start: new Date().toISOString().split("T")[0],
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

            {ticketSeleccionado && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Ticket #{ticketSeleccionado.ID_ticket}</h2>
                        <div className="grid-detalle">
                            <p><strong>C.I. Usuario:</strong> {ticketSeleccionado.ci_usuario}</p>
                            <p><strong>Número de Locker:</strong> {ticketSeleccionado.nrolocker}</p>
                            <p><strong>ID Máquina:</strong> {ticketSeleccionado.ID_maquina}</p>
                            <p><strong>Prioridad:</strong> {ticketSeleccionado.prioridad}</p>
                            <p><strong>Descripción:</strong> {ticketSeleccionado.descripcion}</p>
                        </div>
                        <button className="btn-cerrar-modal" onClick={() => setTicketSeleccionado(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarioSoporte;