import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001";

function InventarioSoporte() {
    const [computadoras, setComputadoras] = useState([]);
    const [mostrarFiltros, setMostrarFiltros] = useState(false);
    const [tipoFiltro, setTipoFiltro] = useState("");
    const [valorFiltro, setValorFiltro] = useState("");
    const [maquinaSeleccionada, setMaquinaSeleccionada] = useState(null);

    useEffect(() => {
        const cargarMaquinas = async () => {
            try {
                const res = await fetch(`${API_URL}/maquina`);
                if (res.ok) {
                    const data = await res.json();
                    setComputadoras(data);
                }
            } catch (error) {
                console.error("Error al cargar las máquinas:", error);
            }
        };

        cargarMaquinas();
    }, []);

    const computadorasFiltradas = computadoras.filter((pc) => {
        if (!tipoFiltro || !valorFiltro) return true;

        if (tipoFiltro === "id") {
            return pc.ID.toString().includes(valorFiltro);
        }
        if (tipoFiltro === "situacion") {
            return pc.situacion && pc.situacion.toLowerCase().includes(valorFiltro.toLowerCase());
        }
        return true;
    });

    return (
        <div>
            <div>
                <button type="button" onClick={() => setMostrarFiltros(!mostrarFiltros)}>
                    Filtrar
                </button>
            </div>

            {mostrarFiltros && (
                <div>
                    <select
                        value={tipoFiltro}
                        onChange={(e) => {
                            setTipoFiltro(e.target.value);
                            setValorFiltro("");
                        }}
                    >
                        <option value="">Seleccione criterio de filtro</option>
                        <option value="id">ID</option>
                        <option value="situacion">Situación</option>
                    </select>

                    {tipoFiltro && (
                        <input
                            type="text"
                            placeholder={`Ingrese valor para ${tipoFiltro}...`}
                            value={valorFiltro}
                            onChange={(e) => setValorFiltro(e.target.value)}
                        />
                    )}
                </div>
            )}

            <div>
                {computadorasFiltradas.map((pc) => (
                    <div key={pc.ID} onClick={() => setMaquinaSeleccionada(pc)}>
                        <div>
                            <strong>ID Máquina: {pc.ID}</strong>
                        </div>
                        <div>Situación: {pc.situacion}</div>
                    </div>
                ))}
            </div>

            {maquinaSeleccionada && (
                <div>
                    <div>
                        <h3>Ficha del Equipo #{maquinaSeleccionada.ID}</h3>
                        <div>
                            <label>Situación:</label>
                            <input type="text" readOnly value={maquinaSeleccionada.situacion || "Sin datos"} />
                        </div>
                        <div>
                            <label>Cargador:</label>
                            <input type="text" readOnly value={maquinaSeleccionada.cargador || "No"} />
                        </div>
                        <div>
                            <label>C.I. Dueño:</label>
                            <input type="text" readOnly value={maquinaSeleccionada.ci_dueno || "Sin asignación"} />
                        </div>
                        <button type="button" onClick={() => setMaquinaSeleccionada(null)}>
                            Volver
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InventarioSoporte;