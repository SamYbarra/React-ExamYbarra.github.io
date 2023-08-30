export const verDetalleEmpleados = (item) => {

    let empleado = [];
    if (sessionStorage.getItem("detalleempleados")) {
        empleado = JSON.parse(sessionStorage.getItem("detalleempleados"));
        let index = -1;
        for (let i = 0; i < empleado.length; i++) {
            if (item.idempleado === empleado[i].idempleado) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            empleado.push(item);
            sessionStorage.setItem("detalleempleados", JSON.stringify(empleado));
        }
    }
    else {
        empleado.push(item);
        sessionStorage.setItem("detalleempleados", JSON.stringify(empleado));
    }

}