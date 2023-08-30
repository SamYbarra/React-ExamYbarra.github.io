import { useEffect, useState } from "react"
import { ApiWebURL } from "../utils";
import Productos from "../components/Productos";

function Tienda() {
    const [listaCategorias, setListaCategorias] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState([]);
    //useState y useEffect son hooks
    useEffect(() => {
        leerServicio();
    }, [])

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "categorias.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setListaCategorias(data);
                seleccionarCategoria(null, data[0]);
            })
    }

    const dibujarLista = () => {
        return (
            <ul className="list-group" id="lista-categorias">
                {listaCategorias.map(item =>
                    <li className="list-group-item" key={item.idcategoria}
                        title={item.descripcion}
                        onClick={(event) => seleccionarCategoria(event, item)}>
                        {item.nombre}
                        <span className="badge text-bg-secondary position-absolute end-90">{item.total}</span>
                    </li>
                )}
            </ul>
        )
    }

    const seleccionarCategoria = (event, item) => {
        let itemsLista = document.querySelectorAll("#lista-categorias li");
        itemsLista.forEach(item =>{
            item.classList.remove("active");
        })

        setCategoriaSeleccionada(item);
        if(event === null){
            if(document.querySelector("#lista-categorias li") !== null){
                document.querySelector("#lista-categorias li").classList.add("active");
            }
        }
        else{
            event.currentTarget.classList.add("active");
        }
    }


    return (
        <section className="padded">
            <div className="container">
                <h2>Tienda</h2>
                <div className="row">
                    <div className="col-xxl-2 col-xl-3 col-md-4 col-sm-5">
                        {dibujarLista()}
                    </div>
                    <div className="col-xxl-10 col-xl-9 col-md-8 col-sm-7">
                        <h3>{categoriaSeleccionada.nombre}</h3>
                        <small>{categoriaSeleccionada.descripcion}</small>
                        <Productos categoriaProductos={categoriaSeleccionada.idcategoria} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Tienda