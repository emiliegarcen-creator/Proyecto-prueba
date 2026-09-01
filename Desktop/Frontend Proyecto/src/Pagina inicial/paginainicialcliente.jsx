import { useEffect, useState } from "react";
import './paginainicialcliente.css';

function Ticket({ ticket }) {

    return (

        <article className="ticket">

            <h3>

                {ticket.tipo === "mantenimiento"
                    ? "Ticket de mantenimiento"
                    : "Ticket de reparación"}

            </h3>


            <p>
                {ticket.descripcion}
            </p>

       // Datos del ticket de reparación
            {ticket.tipo === "reparacion" && (

                <div>

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
            // Datos del ticket de mantenimiento
            {ticket.tipo === "mantenimiento" && (

                <p>
                    Lugar:{" "}
                    {ticket.lugar}
                </p>

            )}


            <p>
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

        console.log(
            "Página principal cargada"
        );

        console.log(
            "Tickets actuales:",
            tickets
        );

    }, [tickets]);

    const mostrarMenuTickets = () => {

        setMostrarOpciones(
            !mostrarOpciones
        );

    };


    return (

        <div className="pagina-principal">
            <header>

                <button
                    type="button"
                    onClick={() =>
                        cambiarPagina("perfil")
                    }
                >

                    {usuario}

                    {" "}

                    Personaemoji

                </button>

            </header>

            <main>

                <h1>
                    Tus Tickets
                </h1>

                <section>

                    {tickets.length === 0 ? (

                        <p>
                            No tienes tickets creados.
                        </p>

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
            <div>

                <button
                    type="button"
                    onClick={mostrarMenuTickets}
                >
                    +
                </button>

                {mostrarOpciones && (

                    <div>

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