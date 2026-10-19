import { useState } from "react";
import "./InventarioSoporte.css";
function InventarioSoporte({ computadoras, historialReparaciones }) {
    // Estados para filtros
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [tipoFiltro, setTipoFiltro] = useState("");
    const [valorFiltro, setValorFiltro] = useState("");
    const [errorFiltro, setErrorFiltro] = useState("");

    // Estados para los popups
    const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);
    const [vistaActiva, setVistaActiva] = useState("historial");

    // Filtrar inventario de computadoras
    const computadorasFiltradas = computadoras.filter((pc) => {
        if (!tipoFiltro || !valorFiltro) return true;

        if (tipoFiltro === "id") {
            return pc.id.toString().includes(valorFiltro);
        }
        if (tipoFiltro === "dueño") {
            return pc.propietario && pc.propietario.toLowerCase().includes(valorFiltro.toLowerCase());
        }
        if (tipoFiltro === "prestamo") {
            return pc.tipoPrestamo && pc.tipoPrestamo.toLowerCase().includes(valorFiltro.toLowerCase());
        }
        return true;
    });

    // Si no se encuentra ninguna computadora con el filtro aplicado, se muestra un mensaje de error
    const manejarFiltrado = (e) => {
        const valor = e.target.value;
        setValorFiltro(valor);

        if (valor && computadoras.filter(pc => {
            if (tipoFiltro === "id") return pc.id.toString().includes(valor);
            if (tipoFiltro === "dueño") return pc.propietario && pc.propietario.toLowerCase().includes(valor.toLowerCase());
            if (tipoFiltro === "prestamo") return pc.tipoPrestamo && pc.tipoPrestamo.toLowerCase().includes(valor.toLowerCase());
            return true;
        }).length === 0) {
            setErrorFiltro("No pudimos encontrar una computadora con estas características, por favor intenta nuevamente");
        } else {
            setErrorFiltro("");
        }
    };

    // Al hacer click en una máquina se abre por defecto el historial
    const abrirMaquina = (pc) => {
        setMaquinaSeleccionada(pc);
        setVistaActiva("historial");
    };

    return (
        <div>
         
            <div>
                <button onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    Filtrar <span>Flechita</span>
                </button>
            </div>

            {/*  Filtros */}
            {mostrarFiltros && (
                <div>
                    <select
                        value={tipoFiltro}
                        onChange={(e) => {
                            setTipoFiltro(e.target.value);
                            setValorFiltro("");
                            setErrorFiltro("");
                        }}
                    >
                        <option value="">Seleccione criterio de filtro</option>
                        <option value="id">ID</option>
                        <option value="dueño">Con dueño</option>
                        <option value="prestamo">En préstamo</option>
                    </select>

                    {tipoFiltro && (
                        <input
                            type="text"
                            placeholder={`Ingrese valor para ${tipoFiltro}...`}
                            value={valorFiltro}
                            onChange={manejarFiltrado}
                        />
                    )}

                    {errorFiltro && <p>{errorFiltro}</p>}
                </div>
            )}

           
            <div>
                {computadorasFiltradas.map((pc) => (
                    <div key={pc.id} onClick={() => abrirMaquina(pc)}>
                        <div>
                            <strong>ID: {pc.id}</strong>
                        </div>
                        <div>
                            <span>Ficha</span>
                        </div>
                        <div>
                            <span>Historial</span>
                        </div>
                    </div>
                ))}
            </div>

           
            {maquinaSeleccionada && (
                <div>
                    <div>
                       
                        <div>
                            <div>
                                <strong>ID: {maquinaSeleccionada.id}</strong>
                            </div>
                            <div>
                                {vistaActiva === "historial" ? (
                                    <button onClick={() => setVistaActiva("ficha")}>
                                        Ficha <span>Flechita</span>
                                    </button>
                                ) : (
                                    <button onClick={() => setVistaActiva("historial")}>
                                        Historial <span>Flechita</span>
                                    </button>
                                )}
                            </div>
                        </div>


                        {vistaActiva === "historial" ? (
                            <div>
                                <h3>Historial de Reparaciones</h3>
                                {historialReparaciones
                                    .filter((h) => h.ticketId === maquinaSeleccionada.id)
                                    .map((item, index) => (
                                        <div key={index}>
                                            <p><strong>Arreglo:</strong> {item.arreglos}</p>
                                            <p><strong>Hecho por:</strong> {item.reparadoPor}</p>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                            <div>
                                <h3>Ficha del Equipo</h3>
                                <div>
                                    <label>Propietario:</label>
                                    <input type="text" readOnly value={maquinaSeleccionada.propietario || "No asignado / En préstamo"} />
                                </div>
                                <div>
                                    <label>Cargador:</label>
                                    <input type="text" readOnly value={maquinaSeleccionada.cargador || "No"} />
                                </div>
                                <div>
                                    <label>Locker:</label>
                                    <input type="text" readOnly value={maquinaSeleccionada.locker || "N/A"} />
                                </div>
                                <div>
                                    <label>Cédula:</label>
                                    <input type="text" readOnly value={maquinaSeleccionada.cedula || "N/A"} />
                                </div>
                            </div>
                        )}

                        {/* Botón para volver*/}
                        <button onClick={() => setMaquinaSeleccionada(null)}>
                            Volver
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InventarioSoporte;