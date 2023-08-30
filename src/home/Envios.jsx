import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";

function Envios() {
    const [listaEmpresas, setListaEmpresas] = useState([]);
    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
    }, [])

    /*
    function leerServicio(){
    }
    */
    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "servicioenvios.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaEmpresas(data);
            })
    }

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Empresa</th>
                        <th>Teléfono</th>
                        <th>Latitud</th>
                        <th>Longitud</th>
                    </tr>
                </thead>
                <tbody>
                    {listaEmpresas.map(item =>
                        <tr key={item.idempresaenvio}>
                            <td>{item.idempresaenvio}</td>
                            <td>{item.nombre}</td>
                            <td>{item.telefono}</td>
                            <td>{item.latitud}</td>
                            <td>{item.longitud}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        )
    }


    return (
        <section className='padded'>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h2>Envíos</h2>
                    </div>
                    <div className="col-md-9">
                        {dibujarTabla()}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Envios