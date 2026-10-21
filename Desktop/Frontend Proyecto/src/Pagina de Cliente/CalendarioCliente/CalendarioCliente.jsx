import "./CalendarioCliente.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./CalendarioCliente.css";

function CalendarioCliente({ tickets, usuarioActual }) {
    // Filtrar solo los tickets que pertenecen al alumno logueado y tengan fecha de entrega
    const eventosCliente = tickets
        .filter((t) => t.dueño === usuarioActual && t.fecha)
        .map((t) => ({
            id: t.id.toString(),
            title: `Mi Máquina (${t.estado})`,
          start: t.fecha,
            allDay: true,
            backgroundColor: t.estado === "Cerrado" ? "#28a745" : "#ffc107"
        }));

    return (
        <div className="calendario-cliente-container">
            <h2>Calendario de Entrega de Dispositivos</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={eventosCliente}
                locale="es"
            />
        </div>
    );
}

export default CalendarioCliente;