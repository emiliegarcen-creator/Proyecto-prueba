import { useEffect, useState } from "react";
import "./PaginaInicialCliente.css";

function Ticket({ ticket }) {

    return (
        <article className="ticket">

            <h3>
                {ticket.tipo === "mantenimiento"
                    ? "Ticket de mantenimiento"
                    : "Ticket de reparación"}
            </h3>

            <p className="ticket-descripcion">
                {ticket.descripcion}
            </p>

            {/* Datos del ticket de reparación */}

            {ticket.tipo === "reparacion" && (
                <div className="ticket-datos">

                    <p>
                        ID de computadora:{" "}
                        {ticket.idComputadora}
                    </p>

                    <p>
                        Modelo:{" "}
                        {ticket.modelo}
                    </p>

                    <p>
                        Cargador:{" "}
                        {ticket.cargador}
                    </p>

                    <p>
                        Locker:{" "}
                        {ticket.locker}
                    </p>

                </div>
            )}

            {/* Datos del ticket de mantenimiento */}

            {ticket.tipo === "mantenimiento" && (
                <p className="ticket-lugar">
                    Lugar:{" "}
                    {ticket.lugar}
                </p>
            )}

            <p className="ticket-estado">
                Estado:{" "}
                {ticket.estado}
            </p>

        </article>
    );
}


function PaginaInicialCliente({
    usuario,
    tickets,
    cambiarPagina
}) {

    const [mostrarOpciones, setMostrarOpciones] =
        useState(false);

    useEffect(() => {

        console.log("Página principal cargada");
        console.log("Tickets actuales:", tickets);

    }, [tickets]);


    const mostrarMenuTickets = () => {

        setMostrarOpciones(!mostrarOpciones);

    };


    return (

        <div className="pagina-principal">

            {/* =========================
                BARRA SUPERIOR
            ========================= */}

            <header className="pagina-header">

                <button
                    type="button"
                    className="usuario-boton"
                    onClick={() =>
                        cambiarPagina("perfil")
                    }
                >

                    <span>
                        {usuario}
                    </span>

                    <span className="usuario-icono">
                        ♙
                    </span>

                </button>

            </header>


            {/* =========================
                CONTENIDO
            ========================= */}

            <main className="pagina-contenido">

                <h1>
                    Tus Tickets
                </h1>


                <section className="tickets-lista">

                    {tickets.length === 0 ? (

                        <div className="sin-tickets">

                            <p>
                                No tienes tickets creados.
                            </p>

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


            {/* =========================
                BOTÓN +
            ========================= */}

            <div className="crear-ticket-menu">

                <button
                    type="button"
                    className="boton-mas"
                    onClick={mostrarMenuTickets}
                >
                    +
                </button>


                {mostrarOpciones && (

                    <div className="opciones-tickets">

                        <button
                            type="button"
                            onClick={() => {

                                setMostrarOpciones(false);

                                cambiarPagina(
                                    "crear-ticket"
                                );

                            }}
                        >
                            Crear ticket de reparación
                        </button>


                        <button
                            type="button"
                            onClick={() => {

                                setMostrarOpciones(false);

                                cambiarPagina(
                                    "mantenimiento"
                                );

                            }}
                        >
                            Ticket de mantenimiento
                        </button>

                    </div>

                )}

            </div>

        </div>

    );
}

export default PaginaInicialCliente;