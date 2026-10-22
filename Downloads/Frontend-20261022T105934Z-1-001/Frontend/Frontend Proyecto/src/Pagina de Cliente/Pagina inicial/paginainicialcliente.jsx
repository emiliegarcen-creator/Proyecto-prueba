import "./paginainicialcliente.css";
import { useEffect, useState } from "react";

function Ticket({ ticket, eliminarTicket }) {
    const [abierto, setAbierto] = useState(false);

    const eliminar = () => {
        if (window.confirm("¿Está seguro de que desea eliminar este ticket?")) {
            eliminarTicket(ticket.ID_ticket);
        }
    };

    return (
        <article className="ticket">
            <h3>Ticket #{ticket.ID_ticket}</h3>
            <p>{ticket.descripcion}</p>

            {abierto && (
                <div>
                    <p>Locker: {ticket.nrolocker}</p>
                    <p>Prioridad: {ticket.prioridad}</p>
                    <p>ID Máquina: {ticket.ID_maquina}</p>
                    <button className="botones" id="boton-cancelar" type="button" onClick={eliminar}>
                        Eliminar ticket
                    </button>
                </div>
            )}

            <button
                id="boton-subir"
                className="botones"
                type="button"
                onClick={() => setAbierto(!abierto)}
            >
                {abierto ? "Ocultar detalles" : "Ver ticket"}
            </button>
        </article>
    );
}

function PaginaInicialCliente({ ciUsuario, cambiarPagina }) {
    const [tickets, setTickets] = useState([]);
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    useEffect(() => {
        const cargarTickets = async () => {
            try {
                const res = await fetch(`http://localhost:3001/usuarios/${ciUsuario}/ticket`);
                if (res.ok) {
                    const data = await res.json();
                    setTickets(data);
                }
            } catch (error) {
                console.error("Error al cargar tickets:", error);
            }
        };

        if (ciUsuario) {
            cargarTickets();
        }
    }, [ciUsuario]);

    const eliminarTicketBD = async (idTicket) => {
        try {
            const res = await fetch(`http://localhost:3001/ticket/${idTicket}`, {
                method: "DELETE"
            });
            if (res.ok) {
                setTickets((actuales) => actuales.filter((t) => t.ID_ticket !== idTicket));
            } else {
                alert("No se pudo eliminar el ticket.");
            }
        } catch (error) {
            console.error("Error al eliminar ticket:", error);
        }
    };

    return (
        <div className="pagina-principal">
            <main>
                <h1>Tus Tickets</h1>
                <section>
                    {tickets.length === 0 ? (
                        <p>No tienes tickets creados.</p>
                    ) : (
                        tickets.map((ticket) => (
                            <Ticket
                                key={ticket.ID_ticket}
                                ticket={ticket}
                                eliminarTicket={eliminarTicketBD}
                            />
                        ))
                    )}
                </section>
            </main>

            <div className="select_ticket">
                <button type="button" onClick={() => setMostrarOpciones(!mostrarOpciones)}>
                    +
                </button>
                {mostrarOpciones && (
                    <div>
                        <button type="button" onClick={() => { setMostrarOpciones(false); cambiarPagina("crear-ticket"); }}>
                            Crear ticket de reparación
                        </button>
                        <button type="button" onClick={() => { setMostrarOpciones(false); cambiarPagina("mantenimiento"); }}>
                            Ticket de mantenimiento
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PaginaInicialCliente;