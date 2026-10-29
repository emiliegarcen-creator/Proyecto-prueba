import "./PaginaInicialSoporte.css";
import { useState } from "react";

function PaginaInicialSoporte({
    tickets,
    actualizarTicket,
    registrarHistorial,
    cambiarPagina
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

    // Popups: se guarda solo el id y el ticket se busca en la lista,
    // así el popup siempre muestra los datos actualizados
    const [idTicketDetalle, setIdTicketDetalle] = useState(null);
    const [idTicketACerrar, setIdTicketACerrar] = useState(null);

    const ticketDetalle = tickets.find((t) => t.id === idTicketDetalle) || null;
    const ticketACerrar = tickets.find((t) => t.id === idTicketACerrar) || null;

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
        if (
            !reparadoPor.trim() ||
            !arreglos.trim() ||
            !horarioEntrega ||
            !cedulaDueño.trim()
        ) {
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
            fechaCierre: new Date().toISOString().slice(0, 10)
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
        setIdTicketACerrar(null);
    };

    // Cancelar el cierre y limpiar lo escrito
    const cancelarCierre = () => {
        setReparadoPor("");
        setArreglos("");
        setHorarioEntrega("");
        setCedulaDueño("");
        setIdTicketACerrar(null);
    };

    // Filtrar lista de tickets
    const ticketsFiltrados = tickets.filter((ticket) => {
        const coincideEstado = !filtroEstado || ticket.estado === filtroEstado;
        const coincidePrioridad = !filtroPrioridad || ticket.prioridad === filtroPrioridad;
        // La fecha se guarda como AAAA-MM-DD, igual que el input type="date"
        const coincideFecha = !filtroFecha || ticket.fecha === filtroFecha;
        // Los tickets de mantenimiento no tienen idComputadora
        const coincideId =
            !filtroId ||
            String(ticket.idComputadora ?? "").includes(filtroId.trim());
        const coincideDueño =
            !filtroDueño ||
            (ticket.dueño &&
                ticket.dueño.toLowerCase().includes(filtroDueño.trim().toLowerCase()));

        return (
            coincideEstado &&
            coincidePrioridad &&
            coincideFecha &&
            coincideId &&
            coincideDueño
        );
    });

    // Menú desplegable de prioridad (se reutiliza en la lista y en el popup)
    const renderMenuPrioridad = (ticket) =>
        menuPrioridadId === ticket.id && (
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
        );

    // Título según el tipo de ticket
    const tituloTicket = (ticket) =>
        ticket.tipo === "mantenimiento"
            ? "Ticket de mantenimiento"
            : "Ticket de reparación";

    return (
        <div>
            {/* Botón de filtrar y acceso al historial */}
            <div>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    Filtrar <span>▼</span>
                </button>

                <button onClick={() => cambiarPagina("historial")}>
                    Ver historial
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
                {ticketsFiltrados.length === 0 && (
                    <p>No hay tickets para mostrar.</p>
                )}

                {ticketsFiltrados.map((ticket) => (
                    <div key={ticket.id}>
                        <div>
                            <div>
                                {ticket.estado === "Pendiente" && (
                                    <button onClick={() => tomarMaquina(ticket)}>
                                        Tomar Máquina
                                    </button>
                                )}

                                {ticket.estado === "En proceso" && (
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

                                        {renderMenuPrioridad(ticket)}

                                        <button onClick={() => setIdTicketACerrar(ticket.id)}>
                                            Cerrar Ticket
                                        </button>
                                    </>
                                )}
                            </div>

                            <div>
                                <strong>{tituloTicket(ticket)}</strong>
                                <div>{ticket.dueño}</div>
                                <div>{ticket.fecha}</div>
                                <div>
                                    Estado: {ticket.estado} · Prioridad: {ticket.prioridad}
                                </div>
                            </div>
                        </div>

                        {/* Popup de información del ticket */}
                        <button onClick={() => setIdTicketDetalle(ticket.id)}>
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
                                {ticketDetalle.estado === "Pendiente" && (
                                    <button
                                        onClick={() => {
                                            tomarMaquina(ticketDetalle);
                                            setIdTicketDetalle(null);
                                        }}
                                    >
                                        Tomar Máquina
                                    </button>
                                )}

                                {ticketDetalle.estado === "En proceso" && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setMenuPrioridadId(
                                                    menuPrioridadId === ticketDetalle.id
                                                        ? null
                                                        : ticketDetalle.id
                                                )
                                            }
                                        >
                                            Cambiar Prioridad
                                        </button>

                                        {renderMenuPrioridad(ticketDetalle)}
                                    </>
                                )}
                            </div>

                            <div>
                                <strong>{tituloTicket(ticketDetalle)}</strong>
                                <div>{ticketDetalle.dueño}</div>
                                <div>{ticketDetalle.fecha}</div>
                                <div>
                                    Estado: {ticketDetalle.estado} · Prioridad: {ticketDetalle.prioridad}
                                </div>
                            </div>
                        </div>

                        <div>
                            <strong>Descripción:</strong>
                            <p>{ticketDetalle.descripcion}</p>
                        </div>

                        {/* Datos según el tipo de ticket */}
                        {ticketDetalle.tipo === "mantenimiento" ? (
                            <div>
                                <div>
                                    <strong>Lugar:</strong> {ticketDetalle.lugar}
                                </div>
                            </div>
                        ) : (
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
                        )}

                        {/* Imagen adjunta */}
                        {ticketDetalle.imagen && (
                            <div>
                                <strong>Imagen adjunta:</strong>
                                <br />
                                <img
                                    src={ticketDetalle.imagen}
                                    alt="Archivo adjunto del ticket"
                                    style={{ width: "200px" }}
                                />
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setMenuPrioridadId(null);
                                setIdTicketDetalle(null);
                            }}
                        >
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
                                onClick={cancelarCierre}
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