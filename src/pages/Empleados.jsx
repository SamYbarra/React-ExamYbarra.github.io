import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";
import { verDetalleEmpleados } from "../utils/indexempleado";

function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [detEmpleados, setDetEmpleados] = useState([]);
    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
        detalleEmpleados();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "servicioempleados.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaEmpleados(data);
            })
    }

    const detalleEmpleados = () => {
        let empleado = [];
        if (sessionStorage.getItem("detalleempleados")) {
            empleado = JSON.parse(sessionStorage.getItem("detalleempleados"));
        }
        setDetEmpleados(empleado);
    }

    const updateDetalleEmpleados = (nuevoEmpleado) => {
        setDetEmpleados(prev => [...prev, nuevoEmpleado]);
    }

    const dibujarCuadricula = () => {
        return (
            <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 g-4">

                {listaEmpleados.map(item =>
                    <div className="col" key={item.idempleado}>
                        <div className="card text-center">
                            <img src={item.imagenchica === null
                                    ? noImage
                                    : ApiWebURL + "fotos/" + item.foto} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{item.nombres} {item.apellidos}</h5>
                                <p className="card-text">{item.cargo}</p>
                                <button type="submit" className="btn btn-primary" disabled={
                                    detEmpleados.find(empleado => empleado.idempleado == item.idempleado)
                                } onClick={() => {
                                    updateDetalleEmpleados(item);
                                    verDetalleEmpleados(item);
                                }}>Seleccionar</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        )
    }

    return (
        <section className="padded">
            <div className="container">
                <h2>Empleados</h2>
                {dibujarCuadricula()}
            </div>
        </section>
    )
}

export default Empleados