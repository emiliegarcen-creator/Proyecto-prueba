import "./PaginaInicialSoporte.css";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function PaginaInicialSoporte() {
    const [tickets, setTickets] = useState([]);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtroPrioridad, setFiltroPrioridad] = useState("");
    const [filtroId, setFiltroId] = useState("");
    const [menuPrioridadId, setMenuPrioridadId] = useState(null);
    const [ticketDetalle, setTicketDetalle] = useState(null);
    const [ticketACerrar, setTicketACerrar] = useState(null);

    const [reparadoPor, setReparadoPor] = useState("");
    const [arreglos, setArreglos] = useState("");
    const [horarioEntrega, setHorarioEntrega] = useState("");
    const [cedulaDueño, setCedulaDueño] = useState("");

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

    const cambiarPrioridad = async (idTicket, nuevaPrioridad) => {
        try {
            const res = await fetch(`${API_URL}/ticket/${idTicket}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prioridad: nuevaPrioridad })
            });

            if (res.ok) {
                setTickets((prev) =>
                    prev.map((t) => (t.ID_ticket === idTicket ? { ...t, prioridad: nuevaPrioridad } : t))
                );
                setMenuPrioridadId(null);
            } else {
                alert("Error al actualizar la prioridad.");
            }
        } catch (error) {
            console.error("Error al cambiar la prioridad:", error);
        }
    };

    const manejarCierre = async (e) => {
        e.preventDefault();

        if (!reparadoPor || !arreglos || !horarioEntrega || !cedulaDueño) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        try {
            const res = await fetch(`${API_URL}/ticket/${ticketACerrar.ID_ticket}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Ticket cerrado y finalizado exitosamente.");
                setTickets((prev) => prev.filter((t) => t.ID_ticket !== ticketACerrar.ID_ticket));
                setReparadoPor("");
                setArreglos("");
                setHorarioEntrega("");
                setCedulaDueño("");
                setTicketACerrar(null);
            } else {
                alert("No se pudo cerrar el ticket.");
            }
        } catch (error) {
            console.error("Error al cerrar el ticket:", error);
        }
    };

    const ticketsFiltrados = tickets.filter((ticket) => {
        const coincidePrioridad = !filtroPrioridad || ticket.prioridad === filtroPrioridad;
        const coincideId = !filtroId || (ticket.ID_maquina !== null && ticket.ID_maquina !== undefined && ticket.ID_maquina.toString().includes(filtroId));
        return coincidePrioridad && coincideId;
    });

    return (
        <div>
            <div>
                <button type="button" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    Filtrar <span>▼</span>
                </button>
            </div>

            {mostrarFiltros && (
                <div>
                    <select
                        value={filtroPrioridad}
                        onChange={(e) => setFiltroPrioridad(e.target.value)}
                    >
                        <option value="">Prioridad (Todas)</option>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </select>

                    <input
                        type="text"
                        placeholder="ID Máquina"
                        value={filtroId}
                        onChange={(e) => setFiltroId(e.target.value)}
                    />
                </div>
            )}

            <div>
                {ticketsFiltrados.map((ticket) => (
                    <div key={ticket.ID_ticket}>
                        <div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMenuPrioridadId(
                                            menuPrioridadId === ticket.ID_ticket ? null : ticket.ID_ticket
                                        )
                                    }
                                >
                                    Prioridad: {ticket.prioridad}
                                </button>

                                {menuPrioridadId === ticket.ID_ticket && (
                                    <div>
                                        <button type="button" onClick={() => cambiarPrioridad(ticket.ID_ticket, "Baja")}>
                                            Baja
                                        </button>
                                        <button type="button" onClick={() => cambiarPrioridad(ticket.ID_ticket, "Media")}>
                                            Media
                                        </button>
                                        <button type="button" onClick={() => cambiarPrioridad(ticket.ID_ticket, "Alta")}>
                                            Alta
                                        </button>
                                    </div>
                                )}

                                <button type="button" onClick={() => setTicketACerrar(ticket)}>
                                    Cerrar Ticket
                                </button>
                            </div>

                            <div>
                                <strong>Ticket #{ticket.ID_ticket}</strong>
                                <div>C.I. Usuario: {ticket.ci_usuario}</div>
                            </div>
                        </div>

                        <button type="button" onClick={() => setTicketDetalle(ticket)}>
                            Descripción
                        </button>
                    </div>
                ))}
            </div>

            {ticketDetalle && (
                <div>
                    <div>
                        <h3>Detalle del Ticket #{ticketDetalle.ID_ticket}</h3>
                        <p><strong>Descripción:</strong> {ticketDetalle.descripcion}</p>
                        <p><strong>Locker:</strong> {ticketDetalle.nrolocker}</p>
                        <p><strong>ID Máquina:</strong> {ticketDetalle.ID_maquina ?? 'Sin asignación'}</p>
                        <button type="button" onClick={() => setTicketDetalle(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {ticketACerrar && (
                <div>
                    <div>
                        <h2>Arreglos realizados en la máquina</h2>
                        <form onSubmit={manejarCierre}>
                            <div>
                                <label>Descripción de arreglos</label>
                                <textarea
                                    value={arreglos}
                                    onChange={(e) => setArreglos(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Hecho por</label>
                                <input
                                    type="text"
                                    value={reparadoPor}
                                    onChange={(e) => setReparadoPor(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Cédula del dueño</label>
                                <input
                                    type="text"
                                    value={cedulaDueño}
                                    onChange={(e) => setCedulaDueño(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Horario de entrega</label>
                                <input
                                    type="time"
                                    value={horarioEntrega}
                                    onChange={(e) => setHorarioEntrega(e.target.value)}
                                />
                            </div>
                            <button type="submit">Subir</button>
                            <button type="button" onClick={() => setTicketACerrar(null)}>
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PaginaInicialSoporte;