import { useState } from "react";
import "./Perfil.css";

function Perfil({
    usuario,
    email,
    rol,
    cambiarPagina,
    cerrarSesion
}) {
    const [foto, setFoto] = useState(null);

    const cambiarFoto = (e) => {
        const archivo = e.target.files[0];

        if (archivo) {
            const nuevaFoto = URL.createObjectURL(archivo);
            setFoto(nuevaFoto);
        }
    };

    return (
        <div className="perfil-pantalla">

            <header className="perfil-header">
                <button
                    type="button"
                    className="perfil-volver"
                    onClick={() => cambiarPagina("inicio")}
                >
                    🏠
                </button>
            </header>


            <main className="perfil-contenido">

                <div className="perfil-caja">

                    <div className="perfil-foto-contenedor">

                        <div className="perfil-foto">

                            {foto ? (
                                <img
                                    src={foto}
                                    alt="Foto de perfil"
                                />
                            ) : (
                                <span>Foto de perfil</span>
                            )}

                        </div>


                        <label className="perfil-cambiar-foto">

                            📷

                            <input
                                type="file"
                                accept="image/*"
                                onChange={cambiarFoto}
                            />

                        </label>

                    </div>


                    <div className="perfil-datos">

                        <div className="perfil-dato">
                            <span>Nombre de usuario</span>
                            <p>{usuario || "Nombre completo"}</p>
                        </div>

                        <div className="perfil-dato">
                            <span>Mail</span>
                            <p>{email || "Mail"}</p>
                        </div>

                        <div className="perfil-dato">
                            <span>Rol</span>
                            <p>{rol || "Rol"}</p>
                        </div>

                    </div>


                    <button
                        type="button"
                        className="perfil-cerrar"
                        onClick={cerrarSesion}
                    >
                        Cerrar sesión
                    </button>

                </div>

            </main>

        </div>
    );
}

export default Perfil;