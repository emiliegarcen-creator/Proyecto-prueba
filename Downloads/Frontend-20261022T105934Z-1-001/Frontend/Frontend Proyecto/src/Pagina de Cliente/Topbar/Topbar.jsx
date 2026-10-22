import { useLocation } from "react-router-dom";
import "./Topbar.css";

function Topbar({ usuario, cambiarPagina }) {
    const location = useLocation();
    const enPerfil = location.pathname === "/perfil";

    return (
        <header className="topbar">
            <button
                className={"topbar-perfil" + (enPerfil ? " activo" : "")}
                onClick={() => cambiarPagina("perfil")}
                title="Mi perfil"
            >
                <span className="topbar-icono"></span>
                <span className="topbar-nombre">{usuario || "Perfil"}</span>
            </button>
        </header>
    );
}

export default Topbar;