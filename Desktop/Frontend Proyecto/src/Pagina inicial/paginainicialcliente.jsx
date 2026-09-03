import './paginainicialcliente.css';
import { useEffect, useState } from "react";


function Ticket({




ticket,


eliminarTicket




}) {




const [abierto, setAbierto] =


    useState(false);




// Eliminar ticket


const eliminar = () => {


    const confirmar = window.confirm(


        "¿Está seguro de que desea eliminar este ticket?"


    );




    if (confirmar) {


        eliminarTicket(ticket.id);


    }


};




return (


    <article className="ticket">


        <h3>


            {ticket.tipo === "mantenimiento"


                ? "Ticket de mantenimiento"


                : "Ticket de reparación"}


        </h3>




        <p>


            {ticket.descripcion}


        </p>




        {/* Boton para visualizar el ticket */}


        <button


            type="button"


            onClick={() =>


                setAbierto(!abierto)


            }


        >


            {abierto


                ? "Ocultar detalles"


                : "Ver ticket"}


        </button>




        {abierto && (


            <div>




                {/* Datos del ticket de reparación */}


                {ticket.tipo === "reparacion" && (


                    <div>


                        <p>


                            ID de computadora:{" "}


                            {ticket.idComputadora}


                        </p>




                        <p>


                            Modelo:{" "}


                            {ticket.modelo}


                        </p>




                        <p>


                            Cargador:{" "}


                            {ticket.cargador}


                        </p>




                        <p>


                            Locker:{" "}


                            {ticket.locker}


                        </p>




                        <p>


                            Año:{" "}


                            {ticket.año}


                        </p>


                    </div>


                )}




                {/* Datos del ticket de mantenimiento */}


                {ticket.tipo === "mantenimiento" && (


                    <p>


                        Lugar:{" "}


                        {ticket.lugar}


                    </p>


                )}




                {/* Imagen adjunta para ambos tipos de ticket */}


                {ticket.imagen && (


                    <div>


                        <p>


                            Imagen adjunta:


                        </p>


                        <img


                            src={ticket.imagen}


                            alt="Archivo adjunto del ticket"


                            style={{


                                width: "200px"


                            }}


                        />


                    </div>


                )}




                <p>


                    Estado:{" "}


                    {ticket.estado}


                </p>




                {/* Boton para eliminar ticket */}


                <button


                    type="button"


                    onClick={eliminar}


                >


                    Eliminar ticket


                </button>


            </div>


        )}


    </article>


);


}


function PaginaInicialCliente({




usuario,


tickets,


eliminarTicket,


cambiarPagina




}) {




const [


    mostrarOpciones,


    setMostrarOpciones


] = useState(false);




useEffect(() => {


    console.log(


        "Página principal cargada"


    );




    console.log(


        "Tickets actuales:",


        tickets


    );


}, [tickets]);




// Mostrar menu de tickets


const mostrarMenuTickets = () => {


    setMostrarOpciones(


        !mostrarOpciones


    );


};




return (


    <div className="pagina-principal">


        <header>


            <button


                type="button"


                onClick={() =>


                    cambiarPagina("perfil")


                }


            >


                {usuario}


                {" "}


                Personaemoji


            </button>


        </header>




        <main>


            <h1>


                Tus Tickets


            </h1>




            <section>


                {tickets.length === 0 ? (


                    <p>


                        No tienes tickets creados.


                    </p>


                ) : (


                    tickets.map((ticket) => (


                        <Ticket


                            key={ticket.id}


                            ticket={ticket}


                            eliminarTicket={eliminarTicket}


                        />


                    ))


                )}


            </section>


        </main>




        <div>


            {/* Boton para crear tickets */}


            <button


                type="button"


                onClick={mostrarMenuTickets}


            >


                +


            </button>




            {mostrarOpciones && (


                <div>


                    {/* Crear ticket de reparación */}


                    <button className='botones'
                        type="button"


                        onClick={() => {


                            setMostrarOpciones(false);


                            cambiarPagina(


                                "crear-ticket"


                            );


                        }}


                    >


                        Crear ticket de reparación


                    </button>




                    {/* Crear ticket de mantenimiento */}


                    <button className='botones'
                        type="button"


                        onClick={() => {

                            setMostrarOpciones(false);

                            cambiarPagina(

                                "mantenimiento"
                            );
                        }}
                    >
                        Ticket de mantenimiento

                    </button>


                </div>


            )}


        </div>




    </div>


);




}


export default PaginaInicialCliente;