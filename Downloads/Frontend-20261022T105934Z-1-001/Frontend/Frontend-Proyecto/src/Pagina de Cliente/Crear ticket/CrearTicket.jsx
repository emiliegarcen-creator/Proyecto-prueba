import "./CrearTicket.css";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "";

function CrearTicket({ cambiarPagina, ciUsuario }) {
    const [descripcion, setDescripcion] = useState("");
    const [idComputadora, setIdComputadora] = useState("");
    const [locker, setLocker] = useState("");
    const [imagen, setImagen] = useState(null);

    const enviarTicket = async (e) => {
        e.preventDefault();

        if (!descripcion || !idComputadora || !locker) {
            alert("Todos los campos requeridos deben completarse.");
            return;
        }

        if (descripcion.length < 30) {
            alert("La descripción debe tener al menos 30 caracteres.");
            return;
        }

        try {
            const respuesta = await fetch(`${API_URL}/usuarios/${ciUsuario}/ticket`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    descripcion,
                    nrolocker: Number(locker),
                    maquina: Number(idComputadora)
                })
            });

            const data = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(data.error || "Error al crear el ticket");
            }

            alert("Ticket creado con éxito.");
            cambiarPagina("inicio");
        } catch (error) {
            alert(error.message);
        }
    };

    const manejarCambio = (e) => {
        const archivo = e.target.files[0];
        if (archivo && archivo.type.startsWith("image/")) {
            setImagen(URL.createObjectURL(archivo));
        } else if (archivo) {
            alert("Seleccione un archivo de imagen válido.");
        }
    };

    return (
        <div className="crear-ticket">
            <h1>Ticket de reparación</h1>
            <form onSubmit={enviarTicket}>
                <div>
                    <label>Adjuntar imagen</label><br />
                    <input type="file" accept="image/*" onChange={manejarCambio} />
                    {imagen && <img src={imagen} alt="Vista previa" style={{ width: "100px" }} />}
                </div><br />

                <div>
                    <label>Descripción</label><br />
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        placeholder="Describa qué está fallando con la computadora"
                    />
                    <p>Caracteres: {descripcion.length}/30</p>
                </div><br />

                <div>
                    <label>ID de la computadora</label><br />
                    <input
                        type="text"
                        value={idComputadora}
                        onChange={(e) => setIdComputadora(e.target.value)}
                        placeholder="Ej: 1"
                    />
                </div><br />

                <div>
                    <label>Número de locker</label><br />
                    <input
                        type="text"
                        value={locker}
                        onChange={(e) => setLocker(e.target.value)}
                        placeholder="Ej: 12"
                    />
                </div><br />

                <button type="submit">Subir</button>
                <button id="boton-cancelar" type="button" onClick={() => cambiarPagina("inicio")}>
                    Cancelar
                </button>
            </form>
        </div>
    );
}

export default CrearTicket;