import { useState } from "react";
import "./Perfil.css";

function Perfil({
    usuario,
    email,
    rol,
    fotoPerfil,
    setFotoPerfil,
    cambiarPagina,
    cerrarSesion
}) {
    // La foto elegida pero todavía no confirmada
    const [fotoTemporal, setFotoTemporal] = useState(null);

    // CAMBIAR FOTO
    const cambiarFoto = (e) => {
        const archivo = e.target.files[0];

        if (archivo) {
            // Validar que sea una imagen
            if (!archivo.type.startsWith("image/")) {
                alert("Seleccione una imagen válida.");
                return;
            }

            setFotoTemporal(URL.createObjectURL(archivo));
        }
    };

    // SUBIR FOTO
    const subirFoto = () => {
        if (!fotoTemporal) {
            alert("Seleccione una foto primero.");
            return;
        }

        setFotoPerfil(fotoTemporal);
        setFotoTemporal(null);
        alert("Foto de perfil actualizada.");
    };

    // Lo que se muestra: primero la vista previa, si no, la foto guardada
    const fotoMostrada = fotoTemporal || fotoPerfil;

    return (
        <div className="perfil">
            {/* Boton de inicio */}
            <button
                className="botones"
                id="boton-subir"
                type="button"
                onClick={() => cambiarPagina("inicio")}
            >
                Casita
            </button>

            <main>
                {/* Foto de perfil */}
                <div className="foto-perfil">
                    {fotoMostrada ? (
                        <img
                            src={fotoMostrada}
                            alt="Foto de perfil"
                            className="foto-perfil-img"
                        />
                    ) : (
                        <span>Foto de perfil</span>
                    )}

                    {/* Boton para cambiar foto de perfil */}
                    <label>
                        Camarita
                        <input
                            type="file"
                            accept="image/*"
                            onChange={cambiarFoto}
                            hidden
                        />
                    </label>

                    {fotoTemporal && (
                        <button type="button" onClick={subirFoto}>
                            Subir
                        </button>
                    )}
                </div>

                {/* Nombre de usuario */}
                <div className="dato-perfil">
                    <p>{usuario || "Nombre Completo"}</p>
                </div>

                {/* Mail de usuario */}
                <div className="dato-perfil">
                    <p>{email || "Mail"}</p>
                </div>

                {/* Rol */}
                <div className="dato-perfil">
                    <p>{rol || "Rol"}</p>
                </div>

                <button
                    className="botones"
                    id="boton-cancelar"
                    type="button"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </button>
            </main>
        </div>
    );
}

export default Perfil;