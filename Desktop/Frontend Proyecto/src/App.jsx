import  {useEffect, useState } from "react";
import Registro from "./Registro/Registro";
import { InicioSesion } from "./Inicio de sesión/iniciodesesion";
import PaginaInicialCliente from "./Pagina inicial/paginainicialcliente";
import TicketMantenimiento from "./Ticket Mantenimiento/TicketMantenimiento";
import Perfil from "./Perfil/Perfil";
import CrearTicket from "./Crear ticket/CrearTicket";

function App() {

    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [rol, setRol] = useState("");

    const [pagina, setPagina] = useState("login");

    const [tickets, setTickets] = useState([]);


    // Cambiar el título de la página según la página actual
    useEffect(() => {

        console.log("PÁGINA ACTUAL:", pagina);

        if (pagina === "login") {
            document.title = "Iniciar sesión";
        }

        if (pagina === "registro") {
            document.title = "Registro";
        }

        if (pagina === "inicio") {
            document.title = "Página principal";
        }

        if (pagina === "crear-ticket") {
            document.title = "Crear ticket";
        }

        if (pagina === "mantenimiento") {
            document.title = "Ticket de mantenimiento";
        }

        if (pagina === "perfil") {
            document.title = "Perfil";
        }

    }, [pagina]);


    // Cambiar de página
    const cambiarPagina = (nuevaPagina) => {

        console.log("CAMBIANDO PÁGINA A:", nuevaPagina);

        setPagina(nuevaPagina);
    };


    // Agregar ticket
    const agregarTicket = (nuevoTicket) => {

        setTickets((ticketsActuales) => [
            ...ticketsActuales,
            nuevoTicket
        ]);

    };


    // Cerrar sesión
    const cerrarSesion = () => {

        setUsuario("");
        setEmail("");
        setRol("");

        cambiarPagina("login");
    };


    return (

        <div>

            {pagina === "login" && (

                <InicioSesion
                    setUsuario={setUsuario}
                    setEmail={setEmail}
                    setRol={setRol}
                    cambiarPagina={cambiarPagina}
                />

            )}


            {pagina === "registro" && (

                <Registro
                    cambiarPagina={cambiarPagina}
                />

            )}


            {pagina === "inicio" && (

                <PaginaInicialCliente
                    usuario={usuario}
                    tickets={tickets}
                    cambiarPagina={cambiarPagina}
                />

            )}


            {pagina === "crear-ticket" && (

                <CrearTicket
                    agregarTicket={agregarTicket}
                    cambiarPagina={cambiarPagina}
                />

            )}


            {pagina === "mantenimiento" && (

                <TicketMantenimiento
                    agregarTicket={agregarTicket}
                    cambiarPagina={cambiarPagina}
                />

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

        </div>

    );
}

export default App;