import "./PaginaInicialSoporte.css";
import { useState } from "react";

function PaginaInicialSoporte({
    tickets,
    actualizarTicket,
    registrarHistorial
}) {
    // Estados para filtros
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [filtroEstado, setFiltroEstado] = useState("");
    const [filtroPrioridad, setFiltroPrioridad] = useState("");
    const [filtroFecha, setFiltroFecha] = useState("");
    const [filtroId, setFiltroId] = useState("");
    const [filtroDueño, setFiltroDueño] = useState("");

    // Prioridad desplegable
    const [menuPrioridadId, setMenuPrioridadId] = useState(null);

    // Popups
    const [ticketDetalle, setTicketDetalle] = useState(null);
    const [ticketACerrar, setTicketACerrar] = useState(null);

    // Formulario Cierre de Ticket
    const [reparadoPor, setReparadoPor] = useState("");
    const [arreglos, setArreglos] = useState("");
    const [horarioEntrega, setHorarioEntrega] = useState("");
    const [cedulaDueño, setCedulaDueño] = useState("");

    // Tomar Máquina
    const tomarMaquina = (ticket) => {
        const ticketActualizado = {
            ...ticket,
            estado: "En proceso"
        };
        actualizarTicket(ticketActualizado);
        alert("Ticket tomado con éxito");
    };

    // Cambiar prioridad
    const cambiarPrioridad = (ticket, nuevaPrioridad) => {
        if (ticket.prioridad === nuevaPrioridad) {
            alert("Selecciona una etiqueta diferente");
            return;
        }

        const ticketActualizado = {
            ...ticket,
            prioridad: nuevaPrioridad
        };

        actualizarTicket(ticketActualizado);
        setMenuPrioridadId(null);
    };

    // Cierre de ticket: Formulario de reparación
    const manejarCierre = (e) => {
        e.preventDefault();

        // Campos obligatorios
        if (!reparadoPor || !arreglos || !horarioEntrega || !cedulaDueño) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Guardar en historial
        const registroHistorial = {
            ticketId: ticketACerrar.id,
            reparadoPor: reparadoPor,
            arreglos: arreglos,
            horarioEntrega: horarioEntrega,
            cedulaDueño: cedulaDueño,
            fechaCierre: new Date().toLocaleDateString()
        };

        registrarHistorial(registroHistorial);

        // Actualizar estado del ticket a Cerrado
        const ticketCerrado = {
            ...ticketACerrar,
            estado: "Cerrado"
        };

        actualizarTicket(ticketCerrado);

        // Limpiar formulario y cerrar popup
        setReparadoPor("");
        setArreglos("");
        setHorarioEntrega("");
        setCedulaDueño("");
        setTicketACerrar(null);
    };

    // Filtrar lista de tickets
    const ticketsFiltrados = tickets.filter((ticket) => {
        const coincideEstado = !filtroEstado || ticket.estado === filtroEstado;
        const coincidePrioridad = !filtroPrioridad || ticket.prioridad === filtroPrioridad;
        const coincideFecha = !filtroFecha || (ticket.fecha && ticket.fecha.includes(filtroFecha));
        const coincideId = !filtroId || ticket.idComputadora.toString().includes(filtroId);
        const coincideDueño = !filtroDueño || (ticket.dueño && ticket.dueño.toLowerCase().includes(filtroDueño.toLowerCase()));

        return (
            coincideEstado &&
            coincidePrioridad &&
            coincideFecha &&
            coincideId &&
            coincideDueño
        );
    });

    return (
        <div>
            {/* Botón de filtrar */}
            <div>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    Filtrar <span>▼</span>
                </button>
            </div>

            {/* Filtros */}
            {mostrarFiltros && (
                <div>
                    <select
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="">Estado (Todos)</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="En proceso">En proceso</option>
                        <option value="Cerrado">Cerrado</option>
                    </select>

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
                        placeholder="ID Computadora"
                        value={filtroId}
                        onChange={(e) => setFiltroId(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Dueño"
                        value={filtroDueño}
                        onChange={(e) => setFiltroDueño(e.target.value)}
                    />

                    <input
                        type="date"
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    />
                </div>
            )}

            {/* Lista de tickets */}
            <div>
                {ticketsFiltrados.map((ticket) => (
                    <div key={ticket.id}>
                        <div>
                            <div>
                                {ticket.estado === "Pendiente" ? (
                                    <button onClick={() => tomarMaquina(ticket)}>
                                        Tomar Máquina
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() =>
                                                setMenuPrioridadId(
                                                    menuPrioridadId === ticket.id
                                                        ? null
                                                        : ticket.id
                                                )
                                            }
                                        >
                                            Cambiar Prioridad
                                        </button>

                                        {/* Menú desplegable de prioridad */}
                                        {menuPrioridadId === ticket.id && (
                                            <div>
                                                <button onClick={() => cambiarPrioridad(ticket, "Baja")}>
                                                    Baja
                                                </button>
                                                <button onClick={() => cambiarPrioridad(ticket, "Media")}>
                                                    Media
                                                </button>
                                                <button onClick={() => cambiarPrioridad(ticket, "Alta")}>
                                                    Alta
                                                </button>
                                            </div>
                                        )}

                                        <button onClick={() => setTicketACerrar(ticket)}>
                                            Cerrar Ticket
                                        </button>
                                    </>
                                )}
                            </div>

                            <div>
                                <strong>
                                    {ticket.dueño || "Nombre del Alumno"}
                                </strong>
                                <div>{ticket.fecha || "10/07/2026"}</div>
                            </div>
                        </div>

                        {/* Popup de información del ticket */}
                        <button onClick={() => setTicketDetalle(ticket)}>
                            Descripción
                        </button>
                    </div>
                ))}
            </div>

            {/* Popup Descripción del Ticket */}
            {ticketDetalle && (
                <div>
                    <div>
                        <div>
                            <div>
                                {ticketDetalle.estado === "Pendiente" ? (
                                    <button
                                        onClick={() => {
                                            tomarMaquina(ticketDetalle);
                                            setTicketDetalle(null);
                                        }}
                                    >
                                        Tomar Máquina
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setMenuPrioridadId(
                                                menuPrioridadId === ticketDetalle.id
                                                    ? null
                                                    : ticketDetalle.id
                                            );
                                        }}
                                    >
                                        Cambiar Prioridad
                                    </button>
                                )}
                            </div>

                            <div>
                                <strong>
                                    {ticketDetalle.dueño || "Nombre"}
                                </strong>
                                <div>{ticketDetalle.fecha || "10/07/2026"}</div>
                            </div>
                        </div>

                        <div>
                            <strong>Descripción:</strong>
                            <p>{ticketDetalle.descripcion}</p>
                        </div>

                        <div>
                            <div>
                                <strong>ID:</strong> {ticketDetalle.idComputadora}
                            </div>
                            <div>
                                <strong>Locker:</strong> {ticketDetalle.locker}
                            </div>
                            <div>
                                <strong>Cargador:</strong> {ticketDetalle.cargador}
                            </div>
                            <div>
                                <strong>Año:</strong> {ticketDetalle.año}
                            </div>
                            <div>
                                <strong>Modelo:</strong> {ticketDetalle.modelo}
                            </div>
                        </div>

                        <button onClick={() => setTicketDetalle(null)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Popup Formulario para cerrar ticket */}
            {ticketACerrar && (
                <div>
                    <div>
                        <h2>Arreglos realizados en la máquina</h2>

                        <form onSubmit={manejarCierre}>
                            <div>
                                <label>Descripción de arreglos</label>
                                <textarea
                                    placeholder="Describa los arreglos realizados..."
                                    value={arreglos}
                                    onChange={(e) => setArreglos(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Hecho por</label>
                                <input
                                    type="text"
                                    placeholder="Técnico que reparó"
                                    value={reparadoPor}
                                    onChange={(e) => setReparadoPor(e.target.value)}
                                />
                            </div>

                            <div>
                                <label>Cédula del dueño</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese C.I."
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

                            <button type="submit">
                                Subir
                            </button>

                            <button
                                type="button"
                                onClick={() => setTicketACerrar(null)}
                            >
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