import { useState, useEffect } from "react";
import Registro from "./Pagina de Cliente/Registro/Registro";
import InicioSesion from "./Pagina de Cliente/Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Pagina de Cliente/Pagina inicial/paginainicialcliente";
import CrearTicket from "./Pagina de Cliente/Crear ticket/CrearTicket";
import TicketMantenimiento from "./Pagina de Cliente/Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Pagina de Cliente/Perfil/Perfil";
import PaginaInicialSoporte from "./Pagina de Soporte/Pagina Inicial Soporte/PaginaInicialSoporte";

const API_URL = "http://localhost:3001";

function App() {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");


    //AAAAAAAAAAAAAAAAAAAAAAAA
    const [pagina, setPagina] = useState("inicio-soporte");
    //const [pagina, setPagina] = useState("login");



    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        if (pagina === "login") document.title = "Iniciar sesión";
        else if (pagina === "registro") document.title = "Registro";
        else if (pagina === "inicio") document.title = "Página principal";
        else if (pagina === "crear-ticket") document.title = "Crear ticket";
        else if (pagina === "mantenimiento") document.title = "Ticket de mantenimiento";
        else if (pagina === "perfil") document.title = "Perfil";
    }, [pagina]);

    const cambiarPagina = (nuevaPagina) => setPagina(nuevaPagina);

    const agregarUsuario = async (nuevoUsuario) => {
        try {
            const respuesta = await fetch(`${API_URL}/usuarios`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario)
            });

            if (!respuesta.ok) {
                const errorData = await respuesta.json();
                throw new Error(errorData.error || "Error al registrar el usuario");
            }

            alert("Usuario registrado correctamente.");
            cambiarPagina("login");
        } catch (error) {
            alert(error.message);
        }
    };

    const iniciarSesion = async (ci, password) => {
        try {
            console.log("Intentando iniciar sesión con la contraseña ingresada:", password);

            const respuesta = await fetch(`${API_URL}/usuarios/${ci}`);
            
            if (!respuesta.ok) {
                alert("Usuario no encontrado o datos inválidos.");
                return;
            }

            const usuarioEncontrado = await respuesta.json();

            setUsuario(usuarioEncontrado.nombre || usuarioEncontrado.ci);
            setEmail(usuarioEncontrado.email || "");
            setRol(usuarioEncontrado.rol || "alumno");

            cambiarPagina("inicio");
        } catch (error) {
            console.error(error);
            alert("Error al conectar con el servidor.");
        }
    };

    const cerrarSesion = () => {
        setUsuario("");
        setEmail("");
        setRol("");
        cambiarPagina("login");
    };

    const agregarTicket = (nuevoTicket) => {
        setTickets((ticketsActuales) => [...ticketsActuales, nuevoTicket]);
    };

    const eliminarTicket = (id) => {
        console.log("Eliminando localmente ticket ID:", id);
        setTickets((ticketsActuales) => ticketsActuales.filter((ticket) => ticket.id !== id));
    };

    return (
        <div>
            {pagina === "login" && (
                <InicioSesion iniciarSesion={iniciarSesion} cambiarPagina={cambiarPagina} />
            )}
            {pagina === "registro" && (
                <Registro agregarUsuario={agregarUsuario} cambiarPagina={cambiarPagina} />
            )}
            {pagina === "inicio" && (
                <PaginaInicialCliente
                    ciUsuario={usuario}
                    ticketsLocales={tickets}
                    eliminarTicketLocal={eliminarTicket}
                    cambiarPagina={cambiarPagina}
                />
            )}
            {pagina === "crear-ticket" && (
                <CrearTicket agregarTicket={agregarTicket} cambiarPagina={cambiarPagina} />
            )}
            {pagina === "mantenimiento" && (
                <TicketMantenimiento agregarTicket={agregarTicket} cambiarPagina={cambiarPagina} />
            )}
            {pagina === "perfil" && (
                <Perfil
                    usuario={usuario}
                    email={email}
                    rol={rol}
                    cambiarPagina={cambiarPagina}
                    cerrarSesion={cerrarSesion}
                />
            )}
            {pagina === "inicio-soporte" && (
                <PaginaInicialSoporte
                    usuario={usuario}
                    cambiarPagina={cambiarPagina}
                    cerrarSesion={cerrarSesion}
                 />
            )}
        </div>
    );
}

export default App;