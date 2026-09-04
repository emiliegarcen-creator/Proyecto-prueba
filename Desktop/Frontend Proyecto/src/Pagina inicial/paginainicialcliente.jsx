import { useEffect, useState } from "react";
import "./paginainicialcliente.css";

function Ticket({ ticket }) {
    const esMantenimiento = ticket.tipo === "mantenimiento";

    return (
        <article className={`ticket-card ${ticket.estado?.toLowerCase()}`}>

            <div className="ticket-card-contenido">

                <h2>
                    {esMantenimiento
                        ? "Ticket de mantenimiento"
                        : "Ticket de reparación"}
                </h2>

                <p className="ticket-descripcion">
                    {ticket.descripcion}
                </p>

                {ticket.tipo === "reparacion" && (
                    <div className="ticket-detalles">
                        <p>
                            <strong>ID de computadora:</strong>{" "}
                            {ticket.idComputadora}
                        </p>

                        <p>
                            <strong>Modelo:</strong>{" "}
                            {ticket.modelo}
                        </p>

                        <p>
                            <strong>Cargador:</strong>{" "}
                            {ticket.cargador}
                        </p>

                        <p>
                            <strong>Locker:</strong>{" "}
                            {ticket.locker}
                        </p>
                    </div>
                )}

                {ticket.tipo === "mantenimiento" && (
                    <p className="ticket-detalles">
                        <strong>Lugar:</strong>{" "}
                        {ticket.lugar}
                    </p>
                )}

                <div className="ticket-estado">
                    {ticket.estado === "Pendiente"
                        ? "Tu ticket está en espera"
                        : ticket.estado === "Solucionado"
                            ? "Tu ticket ya se ha solucionado"
                            : `Estado: ${ticket.estado}`}
                </div>

            </div>


            {ticket.estado === "Pendiente" && (
                <button
                    type="button"
                    className="ticket-cancelar"
                    onClick={() =>
                        alert("La cancelación de tickets todavía no está disponible.")
                    }
                >
                    Cancelar
                </button>
            )}

        </article>
    );
}


function PaginaInicialCliente({
    usuario,
    tickets,
    cambiarPagina
}) {
    const [mostrarOpciones, setMostrarOpciones] = useState(false);

    useEffect(() => {
        console.log("Página principal cargada");
        console.log("Tickets actuales:", tickets);
    }, [tickets]);

    const mostrarMenuTickets = () => {
        setMostrarOpciones(!mostrarOpciones);
    };

    return (
        <div className="pagina-principal">

            <header className="principal-header">

                <div className="principal-nombre">
                    {usuario || "Nombre"}
                </div>

                <button
                    type="button"
                    className="principal-perfil"
                    onClick={() => cambiarPagina("perfil")}
                    aria-label="Abrir perfil"
                >
                    <span className="principal-perfil-cabeza"></span>
                    <span className="principal-perfil-cuerpo"></span>
                </button>

            </header>


            <aside className="principal-sidebar">

                <button
                    type="button"
                    className="sidebar-calendario"
                    onClick={() =>
                        alert("El calendario todavía no está disponible.")
                    }
                    aria-label="Calendario"
                >
                    <span></span>
                </button>

                <div className="sidebar-crear-contenedor">

                    {mostrarOpciones && (
                        <div className="menu-tickets">

                            <button
                                type="button"
                                onClick={() => {
                                    setMostrarOpciones(false);
                                    cambiarPagina("crear-ticket");
                                }}
                            >
                                Reparación
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setMostrarOpciones(false);
                                    cambiarPagina("mantenimiento");
                                }}
                            >
                                Mantenimiento
                            </button>

                        </div>
                    )}

                    <button
                        type="button"
                        className="sidebar-crear"
                        onClick={mostrarMenuTickets}
                        aria-label="Crear ticket"
                    >
                        +
                    </button>

                </div>

            </aside>


            <main className="principal-main">

                <h1>Tus Tickets</h1>

                <section className="tickets-lista">

                    {tickets.length === 0 ? (
                        <div className="sin-tickets">
                            No tienes tickets creados.
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <Ticket
                                key={ticket.id}
                                ticket={ticket}
                            />
                        ))
                    )}

                </section>

            </main>

        </div>
    );
}

export default PaginaInicialCliente;