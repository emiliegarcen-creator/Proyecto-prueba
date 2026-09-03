import { useState } from "react";
import "./CrearTicket.css";

function CrearTicket({ agregarTicket, cambiarPagina }) {
    const [descripcion, setDescripcion] = useState("");
    const [idComputadora, setIdComputadora] = useState("");
    const [cargador, setCargador] = useState("");
    const [modelo, setModelo] = useState("");
    const [locker, setLocker] = useState("");
    const [archivo, setArchivo] = useState(null);

    const enviarTicket = (e) => {
        e.preventDefault();

        // Validar campos obligatorios
        if (
            !descripcion ||
            !idComputadora ||
            !cargador ||
            !modelo ||
            !locker
        ) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        // Validar descripción
        if (descripcion.length < 30) {
            alert("La descripción debe tener al menos 30 caracteres.");
            return;
        }

        // Validar ID de computadora
        if (!/^\d{3}$/.test(idComputadora)) {
            alert("El ID de computadora debe tener exactamente 3 dígitos.");
            return;
        }

        // Validar locker
        if (!/^\d+$/.test(locker)) {
            alert("El número de locker debe contener solamente números.");
            return;
        }

        const nuevoTicket = {
            id: Date.now(),
            tipo: "reparacion",
            descripcion,
            idComputadora,
            cargador,
            modelo,
            locker,
            archivo: archivo ? archivo.name : "",
            estado: "Pendiente",
        };

        agregarTicket(nuevoTicket);

        // Limpiar formulario
        setDescripcion("");
        setIdComputadora("");
        setCargador("");
        setModelo("");
        setLocker("");
        setArchivo(null);

        // Volver a la página principal
        cambiarPagina("inicio");
    };

    return (
        <div className="crear-ticket-pantalla">

            <header className="crear-ticket-header">

                <span>Ticket de reparación</span>

                <button
                    type="button"
                    onClick={() => cambiarPagina("perfil")}
                >
                    Perfil ♙
                </button>

            </header>


            <main className="crear-ticket-contenido">

                <div className="crear-ticket-caja">

                    <form onSubmit={enviarTicket}>

                        {/* DESCRIPCIÓN */}

                        <div className="crear-campo campo-completo">

                            <label htmlFor="descripcion">
                                Descripción del problema
                            </label>

                            <textarea
                                id="descripcion"
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                placeholder="Describa el problema"
                                maxLength={500}
                            />

                            <small>
                                {descripcion.length}/500 caracteres
                            </small>

                        </div>


                        {/* ID DE COMPUTADORA */}

                        <div className="crear-campo">

                            <label htmlFor="idComputadora">
                                ID de computadora
                            </label>

                            <input
                                id="idComputadora"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={idComputadora}
                                onChange={(e) => {
                                    const valor = e.target.value;

                                    if (/^\d*$/.test(valor)) {
                                        setIdComputadora(valor);
                                    }
                                }}
                                placeholder="Ej: 123"
                                maxLength={3}
                            />

                        </div>


                        {/* MODELO */}

                        <div className="crear-campo">

                            <label htmlFor="modelo">
                                Modelo
                            </label>

                            <input
                                id="modelo"
                                type="text"
                                value={modelo}
                                onChange={(e) =>
                                    setModelo(e.target.value)
                                }
                                placeholder="Modelo de la computadora"
                            />

                        </div>


                        {/* CARGADOR */}

                        <div className="crear-campo">

                            <label htmlFor="cargador">
                                ¿Tiene cargador?
                            </label>

                            <select
                                id="cargador"
                                value={cargador}
                                onChange={(e) =>
                                    setCargador(e.target.value)
                                }
                            >

                                <option value="">
                                    Seleccione
                                </option>

                                <option value="Sí">
                                    Sí
                                </option>

                                <option value="No">
                                    No
                                </option>

                            </select>

                        </div>


                        {/* LOCKER */}

                        <div className="crear-campo">

                            <label htmlFor="locker">
                                Locker
                            </label>

                            <input
                                id="locker"
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                value={locker}
                                onChange={(e) => {
                                    const valor = e.target.value;

                                    // Solo permite números
                                    if (/^\d*$/.test(valor)) {
                                        setLocker(valor);
                                    }
                                }}
                                placeholder="Número de locker"
                            />

                        </div>


                        {/* ARCHIVO */}

                        <div className="crear-campo campo-completo campo-archivo">

                            <label htmlFor="archivo">
                                Adjuntar archivo
                            </label>

                            <div className="archivo-contenedor">

                                <input
                                    id="archivo"
                                    type="file"
                                    accept="image/*,.pdf"
                                    onChange={(e) =>
                                        setArchivo(e.target.files[0])
                                    }
                                />

                                <p>
                                    {archivo
                                        ? `Archivo seleccionado: ${archivo.name}`
                                        : "Podés adjuntar una imagen o un PDF"}
                                </p>

                            </div>

                        </div>


                        {/* BOTONES */}

                        <div className="crear-botones">

                            <button
                                type="submit"
                                className="crear-subir"
                            >
                                Subir ticket
                            </button>

                            <button
                                type="button"
                                className="crear-cancelar"
                                onClick={() =>
                                    cambiarPagina("inicio")
                                }
                            >
                                Cancelar
                            </button>

                        </div>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CrearTicket;