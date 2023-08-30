import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";

function Seleccionados() {
    const [itemsEmpleados, setItemsEmpleados] = useState([]);
    useEffect(() => {
        leerDatosCarrito();
    }, [])

    const leerDatosCarrito = () => {
        let datosEmpleados = JSON.parse(sessionStorage.getItem("detalleempleados"));
        setItemsEmpleados(datosEmpleados);
    }

    const dibujarEmpleados = () => {
        return (
            <div className="row row-cols-xl-8 row-cols-lg-4 row-cols-md-3 row-cols-2 g-2">

                {itemsEmpleados !== null
                    ? itemsEmpleados.map(item =>
                        <div className="col" key={item.idempleado}>
                            <div className="card text-center">
                                <img src={ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                    <p className="card-text"> Cargo: {item.cargo}</p>
                                    <p className="card-text"> País: {item.pais}</p>
                                    <p className="card-text"> Ciudad: {item.ciudad}</p>
                                    <p className="card-text"> Teléfono: {item.telefono}</p>
                                    <button type="submit" className="btn btn-primary" onClick={() => eliminarempleado(item)}>Quitar selección</button>
                                </div>
                            </div>
                        </div>
                    )
                    : <></>
                }

            </div>
        )
    }

    const eliminarempleado = (item) => {
        let carritoMenosEmpleado = itemsEmpleados.filter(itemempleado => itemempleado.idempleado !== item.idempleado);
        setItemsEmpleados(carritoMenosEmpleado);
        sessionStorage.setItem("detalleempleados", JSON.stringify(carritoMenosEmpleado));
    }

    const vaciarCarritoEmpleados = () => {
        sessionStorage.removeItem("detalleempleados");
        setItemsEmpleados([]);
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Empleados seleccionados</h2>
                <div className="row">
                    <div className="col-md-10">
                        {dibujarEmpleados()}
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-danger" onClick={() => vaciarCarritoEmpleados()}>
                            Limpiar Lista
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Seleccionados