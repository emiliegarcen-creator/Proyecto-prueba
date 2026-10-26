import { useLocation } from "react-router-dom";
import "./Sidebar.css";

const BOTONES = [
     { texto: "Inicio", icono: "🏠", pagina: "inicio", ruta: "/inicio" },
    { texto: "Calendario", icono: "📅", pagina: "calendario", ruta: "/calendario" }
];

function Sidebar({ cambiarPagina }) {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                {BOTONES.map((boton) => (
                    <button
                        key={boton.ruta}
                        className={
                            "sidebar-boton" +
                            (location.pathname === boton.ruta ? " activo" : "")
                        }
                        onClick={() => cambiarPagina(boton.pagina)}
                    >
                        {boton.texto}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;