import "./HistorialSoporte.css";
function HistorialSoporte({
    historial,
    tickets,
    cambiarPagina
}) {
    return (
        <div>
            <h1>Historial de tickets cerrados</h1>

            <button onClick={() => cambiarPagina("soporte")}>
                Volver
            </button>

            {historial.length === 0 ? (
                <p>Todavía no hay tickets cerrados.</p>
            ) : (
                historial.map((registro) => {
                    // Buscar el ticket original para mostrar sus datos
                    const ticket = tickets.find(
                        (t) => t.id === registro.ticketId
                    );

                    return (
                        <div key={registro.ticketId}>
                            <p>
                                <strong>Tipo:</strong>{" "}
                                {ticket?.tipo === "mantenimiento"
                                    ? "Mantenimiento"
                                    : "Reparación"}
                            </p>
                            <p>
                                <strong>Dueño:</strong> {ticket?.dueño}
                            </p>
                            <p>
                                <strong>Descripción del problema:</strong>{" "}
                                {ticket?.descripcion}
                            </p>
                            <p>
                                <strong>Arreglos realizados:</strong>{" "}
                                {registro.arreglos}
                            </p>
                            <p>
                                <strong>Reparado por:</strong>{" "}
                                {registro.reparadoPor}
                            </p>
                            <p>
                                <strong>Cédula del dueño:</strong>{" "}
                                {registro.cedulaDueño}
                            </p>
                            <p>
                                <strong>Horario de entrega:</strong>{" "}
                                {registro.horarioEntrega}
                            </p>
                            <p>
                                <strong>Fecha de cierre:</strong>{" "}
                                {registro.fechaCierre}
                            </p>
                            <hr />
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default HistorialSoporte;